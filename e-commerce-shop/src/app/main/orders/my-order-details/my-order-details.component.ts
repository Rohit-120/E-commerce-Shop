import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterState } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { OrdersRoutingModule } from '../orders-routing.module';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrderDetailsComponent implements OnInit {
  subscriptions: Subscription[] = []
  placedOrderDetails : any;
  orderId: any;
  currencyInfo: any;

  constructor(
    private apiCall: ApiService,
    private activeRoute: ActivatedRoute,
    private toastService: ToastrService,
    private cdr: ChangeDetectorRef,
    private commonService : CommonService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {

    
    // Breadcrumb Setup
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'My Order',
        url: 'my-orders',
      },
      {
        label: 'My Order Details',
        url: 'order-details/:orderId',
      },
    ]);

    this.activeRoute.params.subscribe((params: any) => {
      console.log(
        params['orderId'],
        'order details params.....................'
      );
      this.orderId = params['orderId'];
    });

    this.getCurrencyInfo()
    this.getPlacedOrderDetail();
  }

  getPlacedOrderDetail() {
    if (this.orderId) {
      let sub = this.apiCall.orderDetails(this.orderId).subscribe({
        next: (res) => {
          console.log('===================>>', res.data.orderDetail);
          
          this.placedOrderDetails = res.data.orderDetail
          this.cdr.markForCheck();
        },
      });
    } else {
      this.toastService.error('orderId ot Found', 'Something went wrong')
    }
  }

  getCurrencyInfo() {
    let sub4 = this.commonService.currencyChanges$.subscribe({
      next: (res) => {
        console.log(res, 'MyOrderDetailsComponent');
        
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub4);
  }

}
