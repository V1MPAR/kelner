import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/services/order.service";
import {LoaderComponent} from "../../../shared/loader/loader.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {OrderModel} from "../../../shared/models/OrderModel";
import {DishModel} from "../../../shared/models/DishModel";

@Component({
  selector: 'app-take-order-cart',
  standalone: true,
  imports: [
    LoaderComponent,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './take-order-cart.component.html',
  styleUrl: './take-order-cart.component.scss'
})
export class TakeOrderCartComponent implements OnInit {

  public order!: OrderModel[];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.order = this.orderService.getOrder();
  }

  deleteDish(dish: DishModel): void {
    this.order = this.orderService.deleteDishFromOrder(dish);
  }

  sumDishPriceByCount(dish: DishModel, count: number): number {
    return dish.price * count;
  }

  decrementCount(item: OrderModel) {
    if (item.count <= 1) {
      return item.count
    }
    item.count--;
    this.orderService.updateOrder(item);
    return item.count;
  }

  incrementCount(item: OrderModel) {
    item.count++;
    this.orderService.updateOrder(item);
    return item.count;
  }

}
