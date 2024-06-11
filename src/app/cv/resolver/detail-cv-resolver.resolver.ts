import { ResolveFn, Router } from '@angular/router';
import { Cv } from '../model/cv';
import { inject } from '@angular/core';
import { CvService } from '../services/cv.service';
import { EMPTY, catchError } from 'rxjs';
import { APP_ROUTES } from 'src/config/routes.config';

export const detailCvResolverResolver: ResolveFn<Cv> = (route, state) => {
  // Je dois récupérer le cv d'id récupérer dans les paramètres de la route
  const id = route.params['id'];
  const cvService = inject(CvService);
  const router = inject(Router);
  return cvService.getCvById(id).pipe(
    catchError((e) => {
      router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    })
  );
};
