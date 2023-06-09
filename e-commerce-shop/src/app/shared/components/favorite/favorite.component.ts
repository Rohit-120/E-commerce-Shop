import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favoriteItems: any[] = [];
  currencyInfo: any;
  subscriptions: Subscription[] = [];

  constructor(
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFavoriteItems();
    this.getCurrencyInfo();
  }

  getFavoriteItems() {
    let sub1 = this.apiCall.getFavoriteProduct().subscribe({
      next: (res: any) => {
        if (res.type === 'success') { 
          this.favoriteItems = res.data.products;
          this.cdr.markForCheck();
          this.commonService.FavoriteItemLength$.next(this.favoriteItems.length);
        }else{
          this.toastService.error( '', res.message)
        }
      },
    });
    this.subscriptions.push(sub1);

  }

  removeFavorite(productId: any, index: number) {
    let sub2 = this.apiCall.removeFavoriteProduct(productId).subscribe({
      next: (res: any) => {
        if (res.type === 'success') {
          this.favoriteItems.splice(index, 1);
          this.toastService.show(res.message, 'Removed from favorites');
          this.cdr.markForCheck();
          this.commonService.FavoriteItemLength$.next(this.favoriteItems.length);
        }
      },
    });
        this.subscriptions.push(sub2);

  }

  getCurrencyInfo() {
    let sub3 = this.commonService.currencyChanges$.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub3);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Function to get total favorite items length.
   */
  // getFavoriteItems() {
  //   let a: any = localStorage.getItem('favorite');
  //   this.favoriteItems = JSON.parse(a);
  //   // console.log(this.favoriteItems, 'favorite items');

  //   // this.cdr.markForCheck()
  // }

  // removeFavorite(item: any) {
  //   let temp: any = localStorage.getItem('favorite');
  //   let removeItem = JSON.parse(temp).filter((data: any) => data.id == item.id);
  //   // console.log(this.favoriteItems.splice(removeItem, 1))
  // }
}
