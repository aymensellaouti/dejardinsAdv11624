import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { masterDetailsResolverResolver } from './master-details-resolver.resolver';

describe('masterDetailsResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => masterDetailsResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
