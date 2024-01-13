import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOrderCartComponent } from './take-order-cart.component';

describe('TakeOrderCartComponent', () => {
  let component: TakeOrderCartComponent;
  let fixture: ComponentFixture<TakeOrderCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeOrderCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakeOrderCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
