import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {lastValueFrom} from "rxjs";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {LoaderComponent} from "../../../shared/loader/loader.component";
import {OrderService} from "../../../shared/services/order.service";
import {OrderDishesDialog} from "../../../shared/dialogs/order-dishes/order-dishes.dialog";
import {OrderApiModel} from "../../../shared/models/OrderModel";

@Component({
  selector: 'app-orders-closed',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './orders-closed.component.html',
  styleUrl: './orders-closed.component.scss'
})
export class OrdersClosedComponent implements OnInit {

  public orders: any[] = [];
  public ordersLoaded = false;

  constructor(private orderService: OrderService, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.readAllOrders().then(r => this.ordersLoaded = true);
  }

  async readAllOrders(closed = 1) {
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
    console.log(order);
    this.dialog.open(OrderDishesDialog, {
      data: {
        order: order
      },
      width: '80%'
    });
  }

}
