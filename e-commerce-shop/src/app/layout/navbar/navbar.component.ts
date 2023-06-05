import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {

  navCategories : any = []
  favoriteItemsLength!: number 
  totalCartLength! : number;
  isCollapsed : boolean = false;
  isNavActive : boolean = false;
  subscription: Subscription[] = [];

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
  ) { }



  ngOnInit(): void {
    this.getProductCategories()
    this.getFavoriteItemsLength();
    this.cartItemLength();
      
  }
  
 /**
   * Function to get product category
   */
  getProductCategories(){
    let sub1 = this.apiCall.getTotalCategories({isCategoryList : true}).subscribe({
      next : (res:any) => {
        this.navCategories = res.data.categories; 
        this.cdr.markForCheck();
        this.commonService.categories.next(this.navCategories);
      }
    });
    this.subscription.push(sub1); 
  }

  /**
   * Function to get total favorite items length.
   */
  getFavoriteItemsLength(){
    let sub2 = this.commonService.FavoriteItemLength.subscribe((res:any) => {
      this.favoriteItemsLength = res.length;
      this.cdr.markForCheck();
    });
    this.subscription.push(sub2);
  }

  /**
   * Function to get Cart length of users .
   */
  cartItemLength(){
    let sub3 = this.apiCall.getCartItems().subscribe({
      next : (carts:any) => {
        // this.totalCartLength =  carts.products.length;
        this.cdr.markForCheck();        
      }
    });
    this.subscription.push(sub3);
  }
  
  categoryToggle(event:any){
    event.stopPropagation()
    this.isCollapsed = !this.isCollapsed;
    this.isNavActive = !this.isNavActive

  }

  @HostListener('document:click', ['$event']) onDocumentClick(event : any) {
    this.isCollapsed = false
  }

  clickOutside(){}

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
