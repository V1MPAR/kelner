import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute, Router} from "@angular/router";
import {Location, NgIf} from "@angular/common";
import {MatBadgeModule} from "@angular/material/badge";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgIf,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router, private location: Location, private orderService: OrderService) {
  }

  checkVisibilityFor(btn: string): boolean {
    switch (btn) {
      case 'arrow_back':
        return this.router.url != '/';

      case 'shopping_cart':
        return this.router.url == '/take-order';

      case 'send_order':
        return this.router.url == '/take-order/cart';

      case 'add_dish':
        return this.router.url == '/settings/dishes';

      default: return true;
    }
  }

  getBack(): void {
    this.location.back();
  }

  goToHome(): void {
    this.router.navigate(['/']).then();
  }

  goToCart(): void {
    this.orderService.sendOrderFromSessionStorage();
    this.router.navigate(['/take-order/cart']).then();
  }

  addDish(): void {
    this.router.navigate(['/settings/dishes/add']).then();
  }

  sendOrder(): void {
    this.orderService.sendOrderFromCart();
  }

  calculateOrderCost(): number {
    return this.orderService.calculateOrderCost();
  }

}
