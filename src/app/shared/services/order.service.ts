import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {BaseApiService, DefaultApiResponse} from "./base-api.service";
import {OrderApiModel, OrderDishesModel, OrderModel} from "../models/OrderModel";
import {Router} from "@angular/router";
import {DishModel} from "../models/DishModel";
import {MatDialog} from "@angular/material/dialog";
import {OrderDishesDialog} from "../dialogs/order-dishes/order-dishes.dialog";
import {InfoDialog} from "../dialogs/info/info.dialog";

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseApiService {

  // @ts-ignore
  public sendOrder: BehaviorSubject<OrderModel[]> = new BehaviorSubject([]);

  constructor(protected override http: HttpClient, private router: Router, private dialog: MatDialog) {
    super(http)
  }

  readAll(closed = 0): Observable<DefaultApiResponse<OrderApiModel>> {
    return this.get('/Order/ReadAll?closed=' + closed);
  }

  getDishesByOrderId(id: number): Observable<DefaultApiResponse<OrderDishesModel>> {
    return this.get('/OrderDishes/ReadByOrderId?id=' + id);
  }

  create(): Observable<DefaultApiResponse<OrderApiModel>> {
    return this.post('/Order', { closed: false });
  }

  createOrderDishes(body: any): Observable<DefaultApiResponse<OrderDishesModel>> {
    return this.post('/OrderDishes', body);
  }

  closeOrder(id: number): Observable<DefaultApiResponse<OrderApiModel>> {
    return this.post('/Order/Close', {id});
  }

  sendOrderFromSessionStorage() {
    const order: OrderModel[] = JSON.parse(sessionStorage.getItem('order')!);
    this.sendOrder.next(order);
  }

  getOrder(): OrderModel[] {
    if (sessionStorage.getItem('order')! == null) {
      return [];
    }

    return JSON.parse(sessionStorage.getItem('order')!);
  }

  saveOrder(order: OrderModel[]) {
    sessionStorage.setItem('order', JSON.stringify(order));
    this.sendOrder.next(order);
  }

  deleteDishFromOrder(dish: DishModel): OrderModel[] {
    const order: OrderModel[] = this.getOrder().filter(item => item.dish.id != dish.id);
    this.saveOrder(order);

    return order;
  }

  async sendOrderFromCart(): Promise<void> {
    if (this.getOrder().length === 0) {
      this.dialog.open(InfoDialog, {
        data: {
          heading: 'Błąd!',
          message: 'Nie możesz wysłać zamówienia, ponieważ jest puste!'
        },
        width: '80%'
      });
      return;
    }
    const order = this.getOrder();
    const result$ = await lastValueFrom(this.create());
    if (result$.statusCode === 200) {
      for (const item of order) {
        await lastValueFrom(this.createOrderDishes({orderId: result$.value.id, dishId: item.dish.id, count: item.count}));
      }
      sessionStorage.removeItem('order');
      this.router.navigate(['/orders']).then();
    }
  }

  updateOrder(uOrder: OrderModel): OrderModel[] {
    const order: OrderModel[] = this.getOrder().map(item => {
      if (item.dish.id === uOrder.dish.id) {
        return uOrder;
      } else {
        return item;
      }
    });
    this.saveOrder(order);

    return order;
  }

  calculateOrderCost(): number {
    let cost = 0;
    this.getOrder().forEach(order => {
      cost += order.dish.price * order.count;
    });

    return cost;
  }

  getCostOfOrder(values: OrderDishesModel[]): number {
    let cost = 0;
    values.forEach(value => {
      cost += value.cost
    })

    return cost;
  }

}
