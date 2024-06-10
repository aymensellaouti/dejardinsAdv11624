import { ResolveFn } from '@angular/router';
import { Cv } from '../model/cv';
import { inject } from '@angular/core';
import { CvService } from '../services/cv.service';

export const detailCvResolverResolver: ResolveFn<Cv> = (route, state) => {
  // Je dois récupérer le cv d'id récupérer dans les paramètres de la route
  const id = route.params['id'];
  const cvService = inject(CvService);
  return cvService.getCvById(id);
};
