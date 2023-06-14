import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orderList: any;

  constructor(
    private apiCall : ApiService,
    private cdr : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(){
    this.apiCall.orderList().subscribe({
      next : (res) => {
        console.log( res.data.orders, 'orders')
        this.orderList = res.data.orders[0];
        this.cdr.markForCheck();
      }
    })
  }

}
  