import { Component } from '@angular/core';
import {LoaderComponent} from "../shared/loader/loader.component";
import {NgIf} from "@angular/common";
import {TakeOrderItemComponent} from "../take-order/components/take-order-item/take-order-item.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    LoaderComponent,
    NgIf,
    TakeOrderItemComponent,
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
