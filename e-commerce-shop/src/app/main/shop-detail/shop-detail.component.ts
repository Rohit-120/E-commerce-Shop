import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ShopDetailComponent implements OnInit {

  singleProductId: any;
  singleProductDetails: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private apiCall: ApiService,
    private activeRouter: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    // activeRouter.params.subscribe(params => {
    //   this.singleProductId = params['id'];
    //   cdr.markForCheck();
    // })
  }

  ngOnInit() {
    this.activeRouter.params.subscribe((param) => {
      this.singleProductId = param['id'];
      this.cdr.detectChanges();
    });
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Shop',
        url: 'shop',
      },
      {
        label: 'Shop Details',
        url: 'shop-details',
      },
    ]);

    
    this.apiCall.getSingleProduct(this.singleProductId).subscribe({
      next: (res) => {
        console.log(res, 'Singleproduct');
        this.singleProductDetails = res;
        this.cdr.detectChanges();
      },
    });
  }
}
