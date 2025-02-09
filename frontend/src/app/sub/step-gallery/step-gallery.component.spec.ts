import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGalleryComponent } from './step-gallery.component';

describe('StepGalleryComponent', () => {
  let component: StepGalleryComponent;
  let fixture: ComponentFixture<StepGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
