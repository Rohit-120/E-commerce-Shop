import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

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
        label: 'Shop List',
        url : 'shop-list',
      }
    ])
  }

}
