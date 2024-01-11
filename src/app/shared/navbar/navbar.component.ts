import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute, Router} from "@angular/router";
import {Location, NgIf} from "@angular/common";
import {MatBadgeModule} from "@angular/material/badge";

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

  constructor(private router: Router, private location: Location) {
  }

  checkVisibilityFor(btn: string): boolean {
    switch (btn) {
      case 'arrow_back':
        return this.router.url != '/';

      case 'shopping_cart':
        return this.router.url == '/take-order';

      default: return true;
    }
  }

  getBack(): void {
    this.location.back();
  }

}
