import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  products!:any[];
 
  constructor(
    private apiCall : ApiService,
    private cdr : ChangeDetectorRef,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    //API call for All product features
    this.apiCall.getAllProduct().subscribe({
      next : (res:any) => {
          this.products = res;     
          console.log(res, 'swalwefk=========================');
        this.cdr.markForCheck();
      }
    })
  }

  productActionIcon() {
    return [
      {
        icon : 'fa fa-shopping-cart',
      },
      {
        icon : 'fa fa-heart',
      },
      {
        icon : 'fa fa-sync-alt',
      },
      { 
        icon : 'fa fa-search',
      },
    ];
  }

  ratingStarIcon(){
    return [
      {
        icon : 'fa fa-star',
      },
      {
        icon : 'fa fa-star',
      },
      {
        icon : 'fa fa-star',
      },
      {
        icon : 'fa fa-star',
      },
      {
        icon : 'fa fa-star',
      },
    ];
  }

  onShopDetail(item:any){
    this.router.navigate(['shop-detail/'+ item.id]);
  }

}
