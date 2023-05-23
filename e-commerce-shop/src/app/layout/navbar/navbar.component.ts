import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  navCategories : any = []
  favoriteItems!: number 
  totalCartLength! : number;
  isCollapsed : boolean = false;

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
    // {
    //   navItem : 'Pages',
    //   isChildren : true,
    //   children : [
    //     {
    //       dropNavItem : 'Shopping Cart',
    //       route : '/cart',
    //     },
    //     {
    //       dropNavItem : 'Checkout',
    //       route : '/checkout',
    //     }
    //   ]
    // },
    // {
    //   navItem : 'Contact',
    //   route : '/contact'
    // },
  ]
  
  constructor(
    private apiCall: ApiService,
    private cdr : ChangeDetectorRef,
    public commonService: CommonService,
    private storageService: StorageService
  ) { }



  ngOnInit(): void {
    this.getProductCategories()
    this.getFavoriteItemsLen();
    this.cartItemLength();
      
  }
  
 /**
   * Function to get product category
   */
  getProductCategories(){
    this.apiCall.getProductCategories().subscribe({
      next : (res) => {
        this.navCategories = res; 
        this.cdr.markForCheck();
        this.commonService.categories.next(this.navCategories);
      }
    })
  }

  /**
   * Function to get total favorite items length.
   */
  getFavoriteItemsLen(){
    this.commonService.FavoriteItemLength.subscribe((data:any) => {
      this.favoriteItems = data.length;
      this.cdr.markForCheck();
    })
  }

  /**
   * Function to get Cart length of users .
   */
  cartItemLength(){
    this.apiCall.getCartItems().subscribe({
      next : (carts:any) => {
        this.totalCartLength =  carts.products.length;
        this.cdr.markForCheck();        
      }
    })
  }
  
  categoryToggle(){
    if (this.isCollapsed) {
      this.isCollapsed = false
      
    }else{
      this.isCollapsed = true;
    }
  }
}
