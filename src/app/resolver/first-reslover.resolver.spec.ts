import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { firstResloverResolver } from './first-reslover.resolver';

describe('firstResloverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => firstResloverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
