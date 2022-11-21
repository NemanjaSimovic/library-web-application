import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveBookPageComponent } from './reserve-book-page.component';

describe('ReserveBookPageComponent', () => {
  let component: ReserveBookPageComponent;
  let fixture: ComponentFixture<ReserveBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveBookPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
