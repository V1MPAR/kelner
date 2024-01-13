import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TakeOrderComponent} from "./take-order/take-order.component";
import {SettingsComponent} from "./settings/settings.component";
import {DishesSettingsComponent} from "./settings/containers/dishes-settings/dishes-settings.component";
import {AddDishComponent} from "./settings/containers/dishes-settings/containers/add-dish/add-dish.component";
import {TakeOrderCartComponent} from "./take-order/containers/take-order-cart/take-order-cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrdersClosedComponent} from "./orders/containers/orders-closed/orders-closed.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'orders/closed',
    component: OrdersClosedComponent
  },
  {
    path: 'take-order',
    component: TakeOrderComponent
  },
  {
    path: 'take-order/cart',
    component: TakeOrderCartComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'settings/dishes',
    component: DishesSettingsComponent
  },
  {
    path: 'settings/dishes/add',
    component: AddDishComponent
  }
];
