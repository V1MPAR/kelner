import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../../../../shared/loader/loader.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {KeyValuePipe, Location, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DishService} from "../../../../../shared/services/dish.service";
import {lastValueFrom} from "rxjs";
import {DishModel} from "../../../../../shared/models/DishModel";
import {InfoDialog} from "../../../../../shared/dialogs/info/info.dialog";
import {MatDialog} from "@angular/material/dialog";

export enum TileColors {
  RED = '#e74c3c',
  LIME = '#2ecc71',
  GREEN = '#1abc9c',
  BLUE = '#3498db',
  PURPLE = '#9b59b6',
  DARK_BLUE = '#34495e',
  YELLOW = '#f1c40f',
  ORANGE = '#e67e22',
}

@Component({
  selector: 'app-add-dish',
  standalone: true,
  imports: [
    LoaderComponent,
    MatButtonModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.scss'
})
export class AddDishComponent implements OnInit {

  public addDishForm!: FormGroup;
  public selectedTileColor: string = TileColors.BLUE;
  public tileColors = TileColors;

  constructor(private formBuilder: FormBuilder, private dishService: DishService, private dialog: MatDialog, private location: Location) {}

  public ngOnInit() {
    this.addDishForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      tileColor: [TileColors.BLUE, [Validators.required]]
    });
  }

  getErrorMessage(formControlName: string): string {
    if (this.addDishForm.get(formControlName)!.hasError('required')) {
      return 'Pole nie może być puste';
    }
    if (this.addDishForm.get(formControlName)!.hasError('minlength')) {
      return 'Pole musi zawierać minimum 4 znaki';
    }
    if (this.addDishForm.get(formControlName)!.hasError('maxlength')) {
      return 'Pole może zawierać maksymalnie 32 znaki';
    }
    if (this.addDishForm.get(formControlName)!.hasError('min')) {
      return 'Pole nie może być mniejsze od zera';
    }
    return '';
  }

  selectTileColor(color: string): void {
    this.selectedTileColor = color;
    this.addDishForm.get('tileColor')!.setValue(color);
  }

  async addDish(): Promise<void> {
    if (this.addDishForm.invalid) {
      return;
    }

    const result$ = await lastValueFrom(this.dishService.add(this.addDishForm.value));

    if (result$.statusCode === 200) {
      this.dialog.open(InfoDialog, {
        data: {
          heading: 'Sukces!',
          message: 'Dodano potrawę.'
        },
        width: '80%'
      }).afterClosed().subscribe(() => {
        this.addDishForm.reset()
        Object.keys(this.addDishForm.controls).forEach(key => {
          this.addDishForm.get(key)!.setErrors(null) ;
        });
        this.location.back();
      });
    }
  }

}
