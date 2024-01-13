import {Component, Input} from '@angular/core';
import {DishModel} from "../../../shared/models/DishModel";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-take-order-item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './take-order-item.component.html',
  styleUrl: './take-order-item.component.scss'
})
export class TakeOrderItemComponent {

  @Input()
  public dish!: DishModel;

  @Input()
  public count!: number;

}
