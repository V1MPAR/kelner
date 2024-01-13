import {Component, OnInit} from '@angular/core';
import {TakeOrderItemComponent} from "./components/take-order-item/take-order-item.component";
import {DishModel} from "../shared/models/DishModel";
import {lastValueFrom} from "rxjs";
import {DishService} from "../shared/services/dish.service";
import {NgFor, NgIf} from "@angular/common";
import {LoaderComponent} from "../shared/loader/loader.component";
import {OrderModel} from "../shared/models/OrderModel";
import {OrderService} from "../shared/services/order.service";

@Component({
  selector: 'app-take-order',
  standalone: true,
  imports: [
    TakeOrderItemComponent,
    NgFor,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './take-order.component.html',
  styleUrl: './take-order.component.scss'
})
export class TakeOrderComponent implements OnInit {

  public dishes: DishModel[] = [];
  public dishesLoaded: boolean = false;

  public order: OrderModel[] = [];

  constructor(private dishService: DishService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getAllDishes().then(r => {
      const order: OrderModel[] = this.orderService.getOrder();
      if (order) {
        this.order = order;
      }
    });
  }

  async getAllDishes(): Promise<void> {
    this.dishesLoaded = false;
    const dishes$ = await lastValueFrom(this.dishService.getAll());
    this.dishesLoaded = true;
    if (dishes$.value) {
      this.dishes = dishes$.value;
    }
  }

  addDishToOrder(dish: DishModel): void {
    const dishInOrder = this.order.filter(item => item.dish.id === dish.id);
    if (dishInOrder.length > 0) {
      dishInOrder[0].count = dishInOrder[0].count + 1;
      this.saveToSessionStorage();
      return;
    }
    this.order.push({dish: dish, count: 1});
    this.saveToSessionStorage();
  }

  getCountOfDishInOrder(dish: DishModel): number {
    const dishInOrder = this.order.filter(item => item.dish.id === dish.id);
    if (dishInOrder.length === 0) {
      return 0;
    }
    return dishInOrder[0].count;
  }

  private saveToSessionStorage(): void {
    sessionStorage.setItem('order', JSON.stringify(this.order));
  }

}
