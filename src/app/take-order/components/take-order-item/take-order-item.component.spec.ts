import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOrderItemComponent } from './take-order-item.component';

describe('TakeOrderItemComponent', () => {
  let component: TakeOrderItemComponent;
  let fixture: ComponentFixture<TakeOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeOrderItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakeOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
