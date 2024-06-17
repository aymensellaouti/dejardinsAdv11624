import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';

export interface ConnectedUser {
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Flux qui informe du user authentifié
  user$: any;

  // c'est un flux qui me notifie que le user est authentifié
  isLoggedIn$!: Observable<boolean>;
  // c'est un flux qui me notifie que le user est deconnecté
  isLoggedOut$!: Observable<boolean>;

  constructor(private http: HttpClient) {
    // Todo Il faudra charger le connectedUser s'il existe
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    // sauvgarder mon ConnectedUser
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
