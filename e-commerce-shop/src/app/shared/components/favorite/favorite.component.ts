import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favoriteItems: any[] = [];
  currencyInfo: any;
  subscriptions: Subscription[] = [];

  constructor(
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {

    this.getFavoriteItems();
    this.getCurrencyInfo();
  
  }

  getFavoriteItems(){
    this.apiCall.getAllProduct({filter: {isMarkedFavorite:true}}).subscribe({
      next : (res: any) => {
       this.favoriteItems =  res.data.products
        this.cdr.markForCheck();
      }
    })
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
