import {Component, OnInit} from '@angular/core';
import {TakeOrderItemComponent} from "./components/take-order-item/take-order-item.component";
import {DishModel} from "../shared/models/DishModel";
import {lastValueFrom} from "rxjs";
import {DishService} from "../shared/services/dish.service";
import {NgFor, NgIf} from "@angular/common";
import {LoaderComponent} from "../shared/loader/loader.component";

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

  constructor(private dishService: DishService) {
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

}
