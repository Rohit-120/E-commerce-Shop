import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductComponent implements OnInit, OnDestroy {
  featuredProduct: any[] = [];
  currencyInfo: any;
  subscriptions: Subscription[] = [];

  constructor(
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    public commonService: CommonService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFeaturesProduct();
    this.getCurrencyInfo();
  }

  getFeaturesProduct() {
    let sub1 = this.apiCall
      .getAllProduct({ filter: { isFeatured: true } })
      .subscribe({
        next: (res) => {
          this.featuredProduct = res.data.products;
          this.cdr.markForCheck();
        },
      });
    this.subscriptions.push(sub1);
  }

  //function for add to cart a product
  addToCartClick(id: any) {
    this.apiCall
      .addToCart({ isAddedFromShop: true, productId: id, quantity: 1 })
      .subscribe({
        next: (res: any) => {
          if (res.type === 'success') {
            this.toastService.success(res.message, 'Added to cart');
          } else {
            this.toastService.error(res.message, 'Login to add to cart');
          }
        },
      });
  }

  getCurrencyInfo() {
    let sub2 = this.commonService.currencyChanges$.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.subscriptions.push(sub2);
  }

  onFavoriteClick(productId: any) {
    this.apiCall.addToFavorite(productId).subscribe({
      next: (res: any) => {
        if (res.type === 'success') {
          this.toastService.success(res.message, 'Added to Favorite');
        } else {
          this.toastService.error(res.message, 'Login to add to Favorite');
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  shopDetails(item: any) {
    this.router.navigate(['shop/shop-detail', item._id]);
  }
}
