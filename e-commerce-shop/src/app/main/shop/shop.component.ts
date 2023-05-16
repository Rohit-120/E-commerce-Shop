import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit {

  constructor(
    private breadcrumbService: BreadcrumbService,
    private apiCall : ApiService
  ) { }

  productItems : any = [
    {
      image : 'assets/img/product-1.jpg',
      productAction : this.productActionIcon(),
      productName : 'Product Name goes here',
      checkedPrice : 123,
      originalPrice : 123,
      ratingStar : this.ratingStarIcon() ,
      totalRating : 99
    },
    {
      image : 'assets/img/product-2.jpg',
      productAction : this.productActionIcon(), 
      productName : 'Product Name goes here',
      checkedPrice : 123,
      originalPrice : 123,
      ratingStar : this.ratingStarIcon() ,
      totalRating : 99
    },
    {
      image : 'assets/img/product-3.jpg',
      productAction : this.productActionIcon(),
      productName : 'Product Name goes here',
      checkedPrice : 123,
      originalPrice : 123,
      ratingStar : this.ratingStarIcon() ,
      totalRating : 99
    },
    {
      image : 'assets/img/product-4.jpg',
      productAction : this.productActionIcon(),
      productName : 'Product Name goes here',
      checkedPrice : 123,
      originalPrice : 123,
      ratingStar : this.ratingStarIcon() ,
      totalRating : 99
    },
    {
      image : 'assets/img/product-5.jpg',
      productAction : this.productActionIcon(),
      productName : 'Product Name goes here',
      checkedPrice : 123,
      originalPrice : 123,
      ratingStar : this.ratingStarIcon() ,
      totalRating : 99
    },
    {
      image : 'assets/img/product-6.jpg',
      productAction : this.productActionIcon(),
      productName : 'Product Name goes here',
      checkedPrice : 123,
      originalPrice : 123,
      ratingStar : this.ratingStarIcon() ,
      totalRating : 99
    },
    {
      image : 'assets/img/product-7.jpg',
      productAction : this.productActionIcon(),
      productName : 'Product Name goes here',
      checkedPrice : 123,
      originalPrice : 123,
      ratingStar : this.ratingStarIcon() ,
      totalRating : 99
    },
    {
      image : 'assets/img/product-8.jpg',
      productAction : this.productActionIcon(),
      productName : 'Product Name goes here',
      checkedPrice : 123,
      originalPrice : 123,
      ratingStar : this.ratingStarIcon() ,
      totalRating : 99
    },
  ]



  
  
  ngOnInit(): void {
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url : '/',
      },
      {
        label: 'Shop',
        url : 'shop',
      },
      {
        label: 'Shop List',
        url : 'shop-list',
      }
    ])

      // //API call for All product features
      // this.apiCall.getAllProduct().subscribe({
      //   next : (res) => {
      //     console.log(res);
          
      //       this.productItems = res;          
      //   }
      // })
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

}
