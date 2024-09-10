import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicCheckerComponent } from './music-checker.component';

describe('MusicCheckerComponent', () => {
  let component: MusicCheckerComponent;
  let fixture: ComponentFixture<MusicCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
