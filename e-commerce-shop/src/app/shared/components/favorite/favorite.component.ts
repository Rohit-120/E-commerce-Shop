import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  allLocalStoreItems: any[] = [];
  favoriteItems: any[] = [];
  constructor(
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    let favItem: any = localStorage.getItem('favorite');
    if (favItem) {
      this.favoriteItems = JSON.parse(favItem);
    }
    this.commonService.favorite.subscribe({
      next: (res: any) => {
        if (res) {
          this.favoriteItems = res.filter((item: any) => {
            return item.isFavorite == true;
          });
          this.commonService.FavoriteItemLength.next(this.favoriteItems)
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    
    localStorage.setItem('favorite', JSON.stringify(this.favoriteItems));

    // this.getFavoriteItems();
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
