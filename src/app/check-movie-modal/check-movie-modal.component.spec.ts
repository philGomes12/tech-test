import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMovieModalComponent } from './check-movie-modal.component';

describe('CheckMovieModalComponent', () => {
  let component: CheckMovieModalComponent;
  let fixture: ComponentFixture<CheckMovieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMovieModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
