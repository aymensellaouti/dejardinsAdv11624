import { ResolveFn } from '@angular/router';

export const firstResloverResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
