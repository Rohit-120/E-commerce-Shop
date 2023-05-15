import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Object for main Categories navigation

  navCategories = [
    {
      category : 'Shirts',
      route : '',
    },
    {
      category : 'Jeans',
      route : '',
    },
    {
      category : 'Swimwear',
      route : '',
    },
    {
      category : 'Sleepwear',
      route : '',
    },
    {
      category : 'Sportswear',
      route : '',
    },
    {
      category : 'Jumpsuits',
      route : '',
    },
    {
      category : 'Blazers',
      route : '',
    },
    {
      category : 'Jackets',
      route : '',
    },
    {
      category : 'Shoes',
      route : '',
    },
  ]


  // Object for main header navigation
  mainNavItems = [
    {
      navItem : 'Home',
      route : '/'
    },
    {
      navItem : 'Shop',
      route : '/shop'
    },
    {
      navItem : 'Shop Details',
      route : '/shop-detail'
    },
    {
      navItem : 'Pages',
      isChildren : true,
      children : [
        {
          dropNavItem : 'Shopping Cart',
          route : '/cart',
        },
        {
          dropNavItem : 'Checkout',
          route : '/checkout',
        }
      ]
    },
    {
      navItem : 'Contact',
      route : '/contact'
    },
  ]

  // Object for addToCart and AddToFavorite 

  addTo = [
    {
      item : 0,
      icon : 'fas fa-heart',
      route : ''
    },
    {
      item : 0,
      icon : 'fas fa-shopping-cart',
      route : '/cart'
    }
  ]
  


  constructor() { }

  ngOnInit(): void {
  }

}
