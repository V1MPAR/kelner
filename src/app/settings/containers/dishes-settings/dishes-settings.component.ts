import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dishes-settings',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './dishes-settings.component.html',
  styleUrl: './dishes-settings.component.scss'
})
export class DishesSettingsComponent {

}
