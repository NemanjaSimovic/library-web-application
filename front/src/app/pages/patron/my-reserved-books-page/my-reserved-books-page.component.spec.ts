import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReservedBooksPageComponent } from './my-reserved-books-page.component';

describe('MyReservedBooksPageComponent', () => {
  let component: MyReservedBooksPageComponent;
  let fixture: ComponentFixture<MyReservedBooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReservedBooksPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReservedBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
