import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import PRODUCT_ACTION_ICONS from 'src/app/shared/constant';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit, OnDestroy {
  productActionIcons = PRODUCT_ACTION_ICONS;
  itemsByCategories: any;
  singleCategory: any = '';
  currencyInfo: any;
  subscriptions: Subscription[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private activateRouter: ActivatedRoute,
    public commonService: CommonService
  ) {}



  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      this.singleCategory = params['category'];

      this.cdr.markForCheck();

      if (this.singleCategory) {
        this.getCategories();
        this.getCurrencyInfo();
      } else {
        this.getProduct();
        this.getCurrencyInfo();
      }
    });

    // Breadcrumb Setup
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
        label: 'Shop List',
        url: 'shop-list',
      },
    ]);
  }

  //API call for particular categories products.
  getCategories() {
    let sub1 = this.apiCall.ProductByCategories(this.singleCategory).subscribe({
      next: (res) => {
        this.itemsByCategories = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }

  //API call for All products
  getProduct() {
    let sub2 = this.apiCall.getAllProduct().subscribe({
      next: (res:any) => {
        console.log(res.data.products, 'all products');
        
        this.itemsByCategories = res.data.products;

        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub2);
  }

  //
  getCurrencyInfo() {
    let sub3 = this.commonService.currencyChanges.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub3);
  }

  //Unsubscribe all subscriptions on Component Destroy
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }  
}
