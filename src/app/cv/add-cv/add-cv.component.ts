import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from 'src/config/routes.config';
import { Cv } from '../model/cv';
import { EMPTY, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.age.valueChanges
      .pipe(tap((age) => (age < 18 ? this.path.disable() : this.path.enable())))
      .subscribe();
  }

  formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group({
    name: ['', { validators: [Validators.required] }],
    firstname: ['', { validators: [Validators.required] }],
    job: ['', { validators: [Validators.required] }],
    path: [''],
    age: [40, { validators: [Validators.required], updateOn: 'blur' }],
    cin: [''],
  });
  addCv() {
    this.cvService.addCv(this.form.value).pipe(
      tap(() => this.router.navigate([APP_ROUTES.cv])),
      catchError(e => {
        this.toaster.error('Veuillez contacter l admin');
        return EMPTY;
      })
    ).subscribe();

  }

  get name() {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname')!;
  }
  get age() {
    return this.form.get('age')!;
  }
  get path() {
    return this.form.get('path')!;
  }
  get cin() {
    return this.form.get('cin')!;
  }
  get job() {
    return this.form.get('job')!;
  }
}
