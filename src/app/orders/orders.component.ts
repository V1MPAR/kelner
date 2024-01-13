import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {OrderApiModel} from "../shared/models/OrderModel";
import {OrderService} from "../shared/services/order.service";
import {lastValueFrom} from "rxjs";
import {LoaderComponent} from "../shared/loader/loader.component";
import {NgIf} from "@angular/common";
import {OrderDishesDialog} from "../shared/dialogs/order-dishes/order-dishes.dialog";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  public orders: any[] = [];
  public ordersLoaded = false;

  constructor(private orderService: OrderService, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.readAllOrders().then(r => this.ordersLoaded = true);
  }

  async readAllOrders(closed = 0) {
    this.orders = [];
    const orders$ = await lastValueFrom(this.orderService.readAll(closed));
    for (let order of orders$.value) {
      const dishes$ = await lastValueFrom(this.orderService.getDishesByOrderId(order.id));
      order = {...order, dishes: dishes$.value, count: dishes$.value.length, cost: this.orderService.getCostOfOrder(dishes$.value)}
      this.orders.push(order);
    }
    return this.orders;
  }

  showOrder(order: any) {
    this.dialog.open(OrderDishesDialog, {
      data: {
        order: order
      },
      width: '80%'
    });
  }

  async closeOrder(order: OrderApiModel): Promise<void> {
    const result$ = await lastValueFrom(this.orderService.closeOrder(order.id));
    if (result$.statusCode === 200) {
      this.ordersLoaded = false;
      this.readAllOrders(0).then(r => this.ordersLoaded = true);
    }
  }

}
