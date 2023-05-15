import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productItems = [
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

  constructor() { }
  
  ngOnInit(): void {
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
