import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDownloadComponent } from './step-download.component';

describe('StepDownloadComponent', () => {
  let component: StepDownloadComponent;
  let fixture: ComponentFixture<StepDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepDownloadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
