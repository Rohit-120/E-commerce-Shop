import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orderList: any;

  constructor(
    private apiCall : ApiService,
    private cdr : ChangeDetectorRef,
    private breadcrumbService : BreadcrumbService
  ) { }

  ngOnInit(): void {

    // Breadcrumb Setup
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'My Orders',
        url: 'my-orders',
      },
    ]);
    this.getOrderList();
  }

  getOrderList(){
    this.apiCall.orderList().subscribe({
      next : (res) => {
        console.log( res.data.orders, 'orders')
        this.orderList = res.data.orders;
        this.cdr.markForCheck();
      }
    })
  }

}
  