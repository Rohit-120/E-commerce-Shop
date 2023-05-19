import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import PRODUCT_ACTION_ICONS from '../../constant';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  products!:any[];
  productActionIcon = PRODUCT_ACTION_ICONS; 

  constructor(
    private apiCall : ApiService,
    private cdr : ChangeDetectorRef,
    private router: Router,
    private storageService: StorageService,
  ) { }
  
  ngOnInit(): void {
    this.getProducts();
  }
  
  //API call for All product features
  getProducts(){
    this.apiCall.getAllProduct().subscribe({
      next : (res:any) => {
          this.products = res;     
        this.cdr.markForCheck();
      }
    })
    
  }
  
  onShopDetail(item:any){
    this.router.navigate(['shop-detail', item.id]);
  }

  onFavoriteClick(actionRoute:any, item:any){
    if (actionRoute.route == '/favorite') {
      this.storageService.set(`${item.id}`, item)
    } 
    
  }

}
