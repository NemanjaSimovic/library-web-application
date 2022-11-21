import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCompComponent } from './book-comp.component';

describe('BookCompComponent', () => {
  let component: BookCompComponent;
  let fixture: ComponentFixture<BookCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
