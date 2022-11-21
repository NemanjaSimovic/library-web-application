import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReservationsPageComponent } from './approve-reservations-page.component';

describe('ApproveReservationsPageComponent', () => {
  let component: ApproveReservationsPageComponent;
  let fixture: ComponentFixture<ApproveReservationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveReservationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
