import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDishDialog } from './edit-dish.dialog';

describe('EditDishDialogComponent', () => {
  let component: EditDishDialog;
  let fixture: ComponentFixture<EditDishDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDishDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDishDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
