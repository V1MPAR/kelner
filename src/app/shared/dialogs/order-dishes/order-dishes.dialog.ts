import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent, MatDialogClose, MatDialogActions,
} from '@angular/material/dialog';
import {LoaderComponent} from "../../loader/loader.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {JsonPipe, NgIf} from "@angular/common";
import {DishService} from "../../services/dish.service";
import {lastValueFrom} from "rxjs";
import {DishModel} from "../../models/DishModel";

@Component({
  selector: 'order-dishes-dialog',
  templateUrl: 'order-dishes.dialog.html',
  styleUrl: 'order-dishes.dialog.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, LoaderComponent, MatButtonModule, MatIconModule, NgIf, JsonPipe, MatDialogClose, MatDialogActions],
})
export class OrderDishesDialog implements OnInit {

  public dishesLoaded = false;
  public dishes: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dishService: DishService) {
  }

  public ngOnInit() {
    this.getDishes().then(r => this.dishesLoaded = true);
  }

  async getDishes() {
    for (const dish of this.data.order.dishes) {
      const dish$ = await lastValueFrom(this.dishService.read(dish.dishId));
      if (dish$.statusCode === 200) {
        this.dishes.push({...dish$.value, count: dish.count});
      }
    }
  }

  sumDishPriceByCount(price: number, count: number): number {
    return price * count;
  }
}
