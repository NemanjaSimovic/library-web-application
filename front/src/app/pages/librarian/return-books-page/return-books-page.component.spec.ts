import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBooksPageComponent } from './return-books-page.component';

describe('ReturnBooksPageComponent', () => {
  let component: ReturnBooksPageComponent;
  let fixture: ComponentFixture<ReturnBooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnBooksPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
