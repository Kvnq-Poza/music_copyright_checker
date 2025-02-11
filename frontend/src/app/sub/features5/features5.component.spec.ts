import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Features5Component } from './features5.component';

describe('Features5Component', () => {
  let component: Features5Component;
  let fixture: ComponentFixture<Features5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Features5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Features5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
