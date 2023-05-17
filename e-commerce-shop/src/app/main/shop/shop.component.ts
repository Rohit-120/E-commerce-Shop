import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import PRODUCT_ACTION_ICONS from 'src/app/shared/constant';
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
    private apiCall : ApiService,
    private cdr : ChangeDetectorRef
  ) { }

  productActionIcons = PRODUCT_ACTION_ICONS;
  productItems : any = []

  // productItems : any = [
  //   {
  //     image : 'assets/img/product-1.jpg',
  //     productName : 'Product Name goes here',
  //     checkedPrice : 123,
  //     originalPrice : 123,
  //     ratingStar : this.ratingStarIcon() ,
  //     totalRating : 99
  //   },
  //   {
  //     image : 'assets/img/product-2.jpg',
  //     productName : 'Product Name goes here',
  //     checkedPrice : 123,
  //     originalPrice : 123,
  //     ratingStar : this.ratingStarIcon() ,
  //     totalRating : 99
  //   },
  //   {
  //     image : 'assets/img/product-3.jpg',
  //     productName : 'Product Name goes here',
  //     checkedPrice : 123,
  //     originalPrice : 123,
  //     ratingStar : this.ratingStarIcon() ,
  //     totalRating : 99
  //   },
  //   {
  //     image : 'assets/img/product-4.jpg',
  //     productName : 'Product Name goes here',
  //     checkedPrice : 123,
  //     originalPrice : 123,
  //     ratingStar : this.ratingStarIcon() ,
  //     totalRating : 99
  //   },
  //   {
  //     image : 'assets/img/product-5.jpg',
  //     productName : 'Product Name goes here',
  //     checkedPrice : 123,
  //     originalPrice : 123,
  //     ratingStar : this.ratingStarIcon() ,
  //     totalRating : 99
  //   },
  //   {
  //     image : 'assets/img/product-6.jpg',
  //     productName : 'Product Name goes here',
  //     checkedPrice : 123,
  //     originalPrice : 123,
  //     ratingStar : this.ratingStarIcon() ,
  //     totalRating : 99
  //   },
  //   {
  //     image : 'assets/img/product-7.jpg',
  //     productName : 'Product Name goes here',
  //     checkedPrice : 123,
  //     originalPrice : 123,
  //     ratingStar : this.ratingStarIcon() ,
  //     totalRating : 99
  //   },
  //   {
  //     image : 'assets/img/product-8.jpg',
  //     productName : 'Product Name goes here',
  //     checkedPrice : 123,
  //     originalPrice : 123,
  //     ratingStar : this.ratingStarIcon() ,
  //     totalRating : 99
  //   },
  // ]

  ngOnInit(): void {
    // Breadcrumb Setup
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

      //API call for All product features
      this.apiCall.getAllProduct().subscribe({
        next : (res) => {
            this.productItems = res;
            this.cdr.markForCheck()          
        }
      })
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
