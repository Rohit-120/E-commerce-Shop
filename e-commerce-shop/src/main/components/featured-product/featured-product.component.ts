import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getFeaturesProduct();
    this.getCurrencyInfo();
  }

  getFeaturesProduct() {
    
    let sub1 = this.apiCall.getAllProduct({filter : {isFeatured : true}}).subscribe({
      next: (res) => {
        this.featuredProduct = res.data.products;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }

  getCurrencyInfo() {
    let sub2 = this.commonService.currencyChanges.subscribe({
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

  onFavoriteClick(index: any) {
    if (this.featuredProduct[index].isFavorite) {
      this.featuredProduct[index].isFavorite = false;
    } else {
      this.featuredProduct[index].isFavorite = true;
    }
    this.commonService.favorite.next(this.featuredProduct);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
