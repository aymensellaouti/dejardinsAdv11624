import { Component, OnDestroy, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { Observable, Subscription, debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnDestroy {
  formBuilder = inject(FormBuilder);
  cvs$: Observable<Cv[]>
  cvService = inject(CvService);
  router = inject(Router);
  subscription: Subscription;
  get search(): AbstractControl {
    return this.form.get('search')!;
  }
  form = this.formBuilder.group({ search: [''] });
  constructor() {
    this.cvs$ = this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((search) => this.cvService.selectByName(search))
    );
    this.subscription = this.cvService.selectedCv$.subscribe((cv) =>
      this.router.navigate(['/cv', cv.id])
    );
    // .subscribe(search => console.log({search}))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
