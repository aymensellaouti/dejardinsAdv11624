import { Component, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-master-dtails-cv',
  templateUrl: './master-dtails-cv.component.html',
  styleUrls: ['./master-dtails-cv.component.css'],
})
export class MasterDtailsCvComponent {
  // La liste des cvs à afficher
  cvs: Cv[] = [];

  cvService = inject(CvService);
  toastr = inject(ToastrService);
  router = inject(Router);
  acr = inject(ActivatedRoute);
  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
  }
  onSelectCv(cv: Cv) {
    this.router.navigate(['details', cv.id], {relativeTo: this.acr})
  }
}
