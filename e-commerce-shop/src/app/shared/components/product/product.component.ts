import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import PRODUCT_ACTION_ICONS from '../../constant';
import { StorageService } from '../../services/storage.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  products!: any[];
  fav: boolean = false;
  productActionIcon = PRODUCT_ACTION_ICONS;
  favoriteProduct: any[] = [];

  constructor(
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private storageService: StorageService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
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
    // this.favoriteProduct.push(item);
    // localStorage.setItem('favorite' ,JSON.stringify(this.favoriteProduct));
    // this.storageService.set(`favorite`, this.favoriteProduct)
    if (this.products[index].isFavorite) {
      this.products[index].isFavorite = false;
    } 
    else {
      
      this.products[index].isFavorite = true;
    }
    this.common.fav.next(this.products);
  }
}
