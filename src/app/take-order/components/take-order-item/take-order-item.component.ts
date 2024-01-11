import {Component, Input} from '@angular/core';
import {DishModel} from "../../../shared/models/DishModel";

@Component({
  selector: 'app-take-order-item',
  standalone: true,
  imports: [],
  templateUrl: './take-order-item.component.html',
  styleUrl: './take-order-item.component.scss'
})
export class TakeOrderItemComponent {

  @Input()
  public dish!: DishModel;

}
