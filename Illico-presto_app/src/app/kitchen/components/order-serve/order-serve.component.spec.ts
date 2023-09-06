import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServeComponent } from './order-serve.component';

describe('OrderServeComponent', () => {
  let component: OrderServeComponent;
  let fixture: ComponentFixture<OrderServeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderServeComponent]
    });
    fixture = TestBed.createComponent(OrderServeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
