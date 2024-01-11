import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TakeOrderComponent} from "./take-order/take-order.component";
import {SettingsComponent} from "./settings/settings.component";
import {DishesSettingsComponent} from "./settings/containers/dishes-settings/dishes-settings.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'take-order',
    component: TakeOrderComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'settings/dishes',
    component: DishesSettingsComponent
  }
];
