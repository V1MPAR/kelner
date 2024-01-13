import {Component, Inject, OnInit} from '@angular/core';
import {LoaderComponent} from "../../../../../shared/loader/loader.component";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DishService} from "../../../../../shared/services/dish.service";
import {lastValueFrom} from "rxjs";
import {TileColors} from "../../containers/add-dish/add-dish.component";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-edit-dish-dialog',
  standalone: true,
  imports: [
    LoaderComponent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    KeyValuePipe,
    MatFormFieldModule,
    MatInputModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-dish.dialog.html',
  styleUrl: './edit-dish.dialog.scss'
})
export class EditDishDialog implements OnInit {

  public dishLoaded = false;
  public editDishForm!: FormGroup;
  public selectedTileColor!: string;
  public tileColors = TileColors;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: DialogRef, private formBuilder: FormBuilder, private dishService: DishService) {}

  public ngOnInit() {
    this.editDishForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      tileColor: [TileColors.BLUE, [Validators.required]]
    });
    this.getDish();
  }

  getErrorMessage(formControlName: string): string {
    if (this.editDishForm.get(formControlName)!.hasError('required')) {
      return 'Pole nie może być puste';
    }
    if (this.editDishForm.get(formControlName)!.hasError('minlength')) {
      return 'Pole musi zawierać minimum 4 znaki';
    }
    if (this.editDishForm.get(formControlName)!.hasError('maxlength')) {
      return 'Pole może zawierać maksymalnie 32 znaki';
    }
    if (this.editDishForm.get(formControlName)!.hasError('min')) {
      return 'Pole nie może być mniejsze od zera';
    }
    return '';
  }

  selectTileColor(color: string): void {
    this.selectedTileColor = color;
    this.editDishForm.get('tileColor')!.setValue(color);
  }

  async getDish() {
    const dish$ = await lastValueFrom(this.dishService.read(this.data.dish.id));
    if (dish$.statusCode === 200) {
      this.editDishForm.setValue({
        name: dish$.value.name,
        price: dish$.value.price,
        description: dish$.value.description,
        tileColor: dish$.value.tileColor,
      });
      this.selectedTileColor = dish$.value.tileColor;
      this.dishLoaded = true;
    }
  }

  async editDish(): Promise<void> {
    if (this.editDishForm.invalid) {
      return;
    }

    const result$ = await lastValueFrom(this.dishService.update({id: this.data.dish.id, ...this.editDishForm.value}));

    if (result$.statusCode === 200) {
      this.dialog.close();
      this.editDishForm.reset()
      Object.keys(this.editDishForm.controls).forEach(key => {
        this.editDishForm.get(key)!.setErrors(null) ;
      });
    }
  }
}
