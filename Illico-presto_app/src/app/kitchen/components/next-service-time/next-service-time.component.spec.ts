import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextServiceTimeComponent } from './next-service-time.component';

describe('NextServiceTimeComponent', () => {
  let component: NextServiceTimeComponent;
  let fixture: ComponentFixture<NextServiceTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextServiceTimeComponent]
    });
    fixture = TestBed.createComponent(NextServiceTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
