import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url : '/',
      },
      {
        label: 'Shop',
        url : 'shop',
      },
      {
        label: 'Shopping  Cart  ',
        url : 'shopping-cart',
      }
    ])
  }

}
