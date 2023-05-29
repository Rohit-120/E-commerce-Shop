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
  currPage: string | number | undefined;
  perPageItems!: number;

  body: any = {
    // // ---------------filter-----------
    // filterByprice: [
    //   {
    //     min: 0,
    //     max: 100,
    //   },
    //   {
    //     min: 100,
    //     max: 200,
    //   },
    // ],
    // filterByColor: ['Black', 'Red'],
    // FilterBySize: ['S', 'M', 'XXL'],
    // isFeatured: true,
    // isMarkedFavorite: true,
    // // ----------------sort-------------
    // sortBy: {
    //   field: 'Rating',
    //   order: 'asc/desc',
    // },
    // // ------------- skip,limit---------
    // page: 1,
    // limit: 5,
  };

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
        console.log('categories');
      } else {
        this.getProduct();
        console.log('all product');
      }
      this.getCurrencyInfo();
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
    let sub1 = this.apiCall
      .getProductSpecificCategories(this.singleCategory)
      .subscribe({
        next: (res) => {
          this.itemsByCategories = res.data;
          this.cdr.markForCheck();
        },
      });
    this.subscriptions.push(sub1);
  }

  //API call for All products
  getProduct() {
    let page = {
      pagination: { page: this.currPage, productsPerPage: this.perPageItems },
    };
    let sub2 = this.apiCall.getAllProduct(page).subscribe({
      next: (res: any) => {
        this.itemsByCategories = res.data;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub2);
  }

  //get all products currently information
  getCurrencyInfo() {
    let sub3 = this.commonService.currencyChanges.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub3);
  }

  pageChange(currPage: number) {
    let page = {
      pagination: { page: currPage, productsPerPage: this.perPageItems },
    };
    this.apiCall.getAllProduct(page).subscribe({
      next: (res) => {
        this.itemsByCategories = res.data;
        this.cdr.markForCheck();
      },
    });
  }

  itemPerPage(item: any) {
    console.log(item, 'page per item');
    this.perPageItems = item;
  }

  //Unsubscribe all subscriptions on Component Destroy
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
