import {DishModel} from "./DishModel";

export interface OrderModel {
  dish: DishModel,
  count: number,
}

export interface OrderApiModel {
  id: number,
  closed: boolean,
}

export interface OrderDishesModel {
  id: number,
  orderId: number,
  dishId: number,
  count: number,
  cost: number,
}
