import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDtailsCvComponent } from './master-dtails-cv.component';

describe('MasterDtailsCvComponent', () => {
  let component: MasterDtailsCvComponent;
  let fixture: ComponentFixture<MasterDtailsCvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDtailsCvComponent]
    });
    fixture = TestBed.createComponent(MasterDtailsCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
