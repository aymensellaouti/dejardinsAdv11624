import { Component, Inject, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { EMPTY, Observable, catchError, count, delay, of, retry } from "rxjs";
import { HelpersService } from "src/app/services/helpers.service";
import { SAY_HELLO_INJECTION_TOKEN } from "src/app/injection Token/sayHello.injection-token";
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  cvs$: Observable<Cv[]> = this.cvService.getCvs().pipe(
    retry({
      delay: 3000,
      count: 4
    }),
    catchError((e) => {
      this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      return of(this.cvService.getFakeCvs());
    })
  );
  selectedCv$: Observable<Cv> = this.cvService.selectedCv$;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    @Inject(HelpersService)
    private helpersService: HelpersService[]
  ) {
    this.helpersService.forEach((instance) => instance.sayHello());

    /**
     * On doit s'inscrire aux flux des cvs sélectionnés
     * Et récupérer le cv et le passer à son enfant CvCard
     */

    // .subscribe({
    //   next: (cvs) => {
    //     this.cvs = cvs;
    //   },
    //   error: () => {
    //     this.cvs =

    //   },
    // });
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
  }
  // onForwardCv(cv: Cv) {
  //   this.selectedCv = cv;
  // }
}
