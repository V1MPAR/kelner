import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesSettingsComponent } from './dishes-settings.component';

describe('DishesSettingsComponent', () => {
  let component: DishesSettingsComponent;
  let fixture: ComponentFixture<DishesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishesSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DishesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
