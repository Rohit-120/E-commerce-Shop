import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, OnDestroy {
  products: any[] = [];
  fav: boolean = false;
  favoriteProduct: any[] = [];
  currencyInfo: any;
  subscriptions: Subscription[] = [];

  constructor(
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public commonService: CommonService,
    private toastService: ToastrService
  ) {}
  
  
  ngOnInit() {
    this.getProducts();
    this.getCurrencyInfo();
  }

  //API call for All product features
  getProducts() {
    let sub1 = this.apiCall.getAllProduct().subscribe({
      next: (res: any) => {
        this.products = res?.data?.products;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }

  onShopDetail(item: any) {
    this.router.navigate(['shop/shop-detail', item._id]);
  }

  //function for add to cart a product
  addToCartClick(id: any) {
    console.log('addToCart =====>  ', id);

    let sub2 = this.commonService.addToCartClick(id, 1, true).subscribe({
      next: (res: any) => {
        if (res.type === 'success') {
          this.toastService.success(res?.message, 'Added to cart');
        } else {
          this.toastService.error(res?.message, 'Login to add to cart');
        }
      },
      error: (err: any) => {},
    });
    this.subscriptions.push(sub2);
  }

  onFavoriteClick(productId: any) {
    let sub3 = this.apiCall.addToFavorite(productId).subscribe({
      next: (res: any) => {
        if (res.type === 'success') {
          this.toastService.success(res.message, 'Added to Favorite');
        }else{
          this.toastService.error(res.message, 'Login to add to Favorite');
        }
      },
    });
    this.subscriptions.push(sub3);
  }

  getCurrencyInfo() {
    let sub4 = this.commonService.currencyChanges$.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub4);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

// if (this.products[index].isFavorite) {
//   this.products[index].isFavorite = false;
// } else {
//   this.products[index].isFavorite = true;
// }

// this.commonService.favorite.next(this.products);
