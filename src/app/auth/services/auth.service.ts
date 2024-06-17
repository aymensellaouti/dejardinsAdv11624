import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';

export interface ConnectedUser {
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Flux qui informe du user authentifié
  private userSubject$: BehaviorSubject<ConnectedUser | null> =
    new BehaviorSubject<ConnectedUser | null>(null);
  user$ = this.userSubject$.asObservable();
  // c'est un flux qui me notifie que le user est authentifié
  isLoggedIn$: Observable<boolean> = this.userSubject$.pipe(
    map((user) => !!user)
  );
  // c'est un flux qui me notifie que le user est deconnecté
  isLoggedOut$: Observable<boolean> = this.userSubject$.pipe(
    map((user) => !user)
  );

  constructor(private http: HttpClient) {
    // Todo Il faudra charger le connectedUser s'il existe
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    // sauvgarder mon ConnectedUser
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.id);
        const user = { id: response.userId, email: credentials.email };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject$.next(user);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject$.next(null);
  }
}
