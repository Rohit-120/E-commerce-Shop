import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { CommonService } from '../../services/common.service';
import { CurrencyChangeService } from '../../services/currency-change.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  products!: any[];
  fav: boolean = false;
  favoriteProduct: any[] = [];

  constructor(
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private storageService: StorageService,
    private common: CommonService,
    public currencyService: CurrencyChangeService
  ) {}

  ngOnInit(){
    this.getProducts();
  }

  //API call for All product features
  getProducts() {
    this.apiCall.getAllProduct().subscribe({
      next: (res: any) => {
        this.products = res;
        this.cdr.markForCheck();
      },
    });
  }

  onShopDetail(item: any) {
    this.router.navigate(['shop-detail', item.id]);
  }

  onFavoriteClick(index: any) {
    
    if (this.products[index].isFavorite) {
      this.products[index].isFavorite = false;
    } 
    else {
      
      this.products[index].isFavorite = true;
    }
    
    this.common.favorite.next(this.products);
  }
}
