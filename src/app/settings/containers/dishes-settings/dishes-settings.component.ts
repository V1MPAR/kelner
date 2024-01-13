import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {LoaderComponent} from "../../../shared/loader/loader.component";
import {TakeOrderItemComponent} from "../../../take-order/components/take-order-item/take-order-item.component";
import {DishModel} from "../../../shared/models/DishModel";
import {DishService} from "../../../shared/services/dish.service";
import {lastValueFrom} from "rxjs";
import {OrderDishesDialog} from "../../../shared/dialogs/order-dishes/order-dishes.dialog";
import {MatDialog} from "@angular/material/dialog";
import {EditDishDialog} from "./dialogs/edit-dish/edit-dish.dialog";
import {InfoDialog} from "../../../shared/dialogs/info/info.dialog";

@Component({
  selector: 'app-dishes-settings',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    NgIf,
    LoaderComponent,
    TakeOrderItemComponent
  ],
  templateUrl: './dishes-settings.component.html',
  styleUrl: './dishes-settings.component.scss'
})
export class DishesSettingsComponent implements OnInit {

  public dishes: DishModel[] = [];
  public dishesLoaded: boolean = false;

  constructor(private dishService: DishService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllDishes().then(r => console.log(r));
  }

  async getAllDishes(): Promise<void> {
    this.dishesLoaded = false;
    const dishes$ = await lastValueFrom(this.dishService.getAll());
    this.dishesLoaded = true;
    if (dishes$.value) {
      this.dishes = dishes$.value;
    }
  }

  editDish(dish: DishModel): void {
    this.dialog.open(EditDishDialog, {
      data: {
        dish: dish
      },
      width: '80%'
    }).afterClosed().subscribe(() => {
      this.getAllDishes().then();
    })
  }

  async deleteDish(dish: DishModel): Promise<void> {
    const result$ = await lastValueFrom(this.dishService.remove(dish.id!));

    if (result$.statusCode === 204) {
      this.dialog.open(InfoDialog, {
        data: {
          heading: 'Sukces!',
          message: 'Usunięto potrawę.'
        },
        width: '80%'
      });
      this.dishes = this.dishes.filter(item => item != dish);
    }
  }

}
