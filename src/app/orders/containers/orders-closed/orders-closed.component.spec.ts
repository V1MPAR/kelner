import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersClosedComponent } from './orders-closed.component';

describe('OrdersClosedComponent', () => {
  let component: OrdersClosedComponent;
  let fixture: ComponentFixture<OrdersClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersClosedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
