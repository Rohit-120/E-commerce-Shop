import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  // Object for main Categories navigation
  navCategories : any = []


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
    // {
    //   navItem : 'Shop Details',
    //   route : '/shop-detail'
    // },
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
      icon : 'fas fa-heart',
      route : ''
    },
    {
      icon : 'fas fa-shopping-cart',
      route : '/cart'
    }
  ]
  
  constructor(
    private apiCall: ApiService,
    private cdr : ChangeDetectorRef,
    public commonService: CommonService
  ) { }



  ngOnInit(): void {
    this.getProducts()
  }
  

  getProducts(){
    this.apiCall.getProductCategories().subscribe({
      next : (res) => {
        this.navCategories = res; 
        this.cdr.markForCheck();
      }
    })
  }

}
