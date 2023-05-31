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
import { BODY_FILTER } from 'src/app/shared/modals/interfaces';
// import { BODY_FILTER } from 'src/app/shared/modals/interfaces';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
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
  totalProducts!: number;
  sortingDropdown: any = [
    { label: 'rating(Low to High)', name: 'rating', order: 'asc' },
    { label: 'rating(High to Low)', name: 'rating', order: 'desc' },
    { label: 'price(Low to High)', name: 'price', order: 'asc' },
    { label: 'price(High to Low)', name: 'price', order: 'desc' },
  ];
  currentSortItem: any;
  currentSortLabel: string = 'Sort By';
  currPage: any = 1;
  perPageItems: number = 5;

  filterProducts: any = {};

  body: BODY_FILTER = {
    filter : {

      // // ---------------filter-----------
      // filterByPrice:[],
      // filterByColor: ['Black', 'Red'],
      // FilterBySize: ['S', 'M', 'XXL'],
      // isFeatured: true,
      // isMarkedFavorite: true,
      // // ----------------sort-------------
    },
      sort: {
        field: '', // fieldName
        order: '', // asc or desc
      },
      // // ------------- skip,limit---------
      
      pagination: { page: this.currPage, productsPerPage: this.perPageItems },
  };

  constructor(
    private breadcrumbService: BreadcrumbService,
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private activateRouter: ActivatedRoute,
    public commonService: CommonService
  ) {}
  isCategoryShow: boolean = false;
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      this.body.filter.category = params['category']||'';

      this.cdr.markForCheck();

      if ( this.body.filter.category) {
        this.isCategoryShow = true;
        this.getCategoriesWiseProduct();
      } else {
        this.getProduct();
      }
      this.getCurrencyInfo();
      this.getFilterList();
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

  //API call for particular categories products if category available on activeRoute.
  getCategoriesWiseProduct() {

    let sub1 = this.apiCall.getAllProduct(this.body).subscribe({
      next: (res) => {
        this.itemsByCategories = res.data;
        this.totalProducts = this.itemsByCategories.length;


        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }

  //API call for All products
  getProduct() {
    if (this.isCategoryShow) {
      this.getCategoriesWiseProduct();
    } else {
      let sub2 = this.apiCall.getAllProduct(this.body).subscribe({
        next: (res: any) => {
          this.totalProducts = res.totalProducts;
          this.itemsByCategories = res.data;
          
          this.cdr.markForCheck();
        },
      });
      this.subscriptions.push(sub2);
    }
  }

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
    if (this.isCategoryShow) {
      this.getCategoriesWiseProduct();
    } else {
      this.body.pagination.page = currPage;
      this.body.pagination.productsPerPage = this.perPageItems;

      this.apiCall.getAllProduct(this.body).subscribe({
        next: (res) => {
          this.totalProducts = res.totalProducts;
          this.itemsByCategories = res.data;
          this.cdr.markForCheck();
        },
      });
    }
  }

  itemPerPage(item: any) {
    // console.log(item, 'page per item');
    if (this.body.pagination.productsPerPage != item) {
      this.body.pagination.productsPerPage = item;
      this.perPageItems = item;
      this.getProduct();
      this.cdr.markForCheck();
    }
  }

  sorting(item: any) {
    this.currentSortLabel = item.label;
    this.body.sort.field = item.name;
    this.body.sort.order = item.order;

    if (this.isCategoryShow) {
      this.getCategoriesWiseProduct();
    } else {
      this.getProduct();
    }
  }

  getFilterList() {
    this.apiCall.getProductFilterList().subscribe({
      next : (res) => {
        
        this.filterProducts.filterByPrice =  res.data.priceRanges;
        this.filterProducts.filterByColor =  res.data.colors;
        this.filterProducts.filterBySize =  res.data.sizes;
        this.cdr.markForCheck();
      }
    })
  }

  getFilterData(event:any,item : any, filterType : string){
  
    let priceRange :any = {
      
    };
    priceRange['min']= item.min;
    priceRange['max'] = item.max;
    if(event.target.checked){
      if(!("price" in this.body.filter) ){
        this.body.filter.price=[]
      }
      this.body.filter?.price?.push(priceRange)
      console.log("1111111111111111111111111111111111", this.body)
    }else{
      console.log(this.body.filter?.price?.indexOf(item), 'ininininininininin');
      
      let i = this.body.filter?.price?.indexOf(item);
      
      console.log("2222222222222222222222222222222222", this.body)
    }
    
  }

  //Unsubscribe all subscriptions on Component Destroy
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
