import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmServedProductDialogComponent } from './confirm-served-product-dialog.component';

describe('ConfirmServedProductDialogComponent', () => {
  let component: ConfirmServedProductDialogComponent;
  let fixture: ComponentFixture<ConfirmServedProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmServedProductDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmServedProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
