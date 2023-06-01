import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, OnDestroy {
  products!: any[];
  fav: boolean = false;
  favoriteProduct: any[] = [];
  currencyInfo: any;
  subscriptions: Subscription[] = [];

  constructor(
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private storageService: StorageService,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.getProducts();

    this.getCurrencyInfo();
  }

  //API call for All product features
  getProducts() {
    let sub1 = this.apiCall.getAllProduct().subscribe({
      next: (res: any) => {
        this.products = res.data.products;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }

  onShopDetail(item: any) {
    this.router.navigate(['shop-detail', item.id]);
  }

  onFavoriteClick(index: any) {
    if (this.products[index].isFavorite) {
      this.products[index].isFavorite = false;
    } else {
      this.products[index].isFavorite = true;
    }

    this.commonService.favorite.next(this.products);
  }

  getCurrencyInfo() {
    let sub2 = this.commonService.currencyChanges.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
