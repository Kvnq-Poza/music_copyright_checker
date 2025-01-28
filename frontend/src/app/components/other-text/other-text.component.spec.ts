import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTextComponent } from './other-text.component';

describe('OtherTextComponent', () => {
  let component: OtherTextComponent;
  let fixture: ComponentFixture<OtherTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
