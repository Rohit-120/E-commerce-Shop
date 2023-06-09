import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  navCategories: any[] = [];
  favoriteItemsLength!: number;
  totalCartLength!: number;
  isCollapsed: boolean = false;
  isNavActive: boolean = false;
  isMobileNavActive: boolean = false;

  subscription: Subscription[] = [];

  // Object for main header navigation
  mainNavItems = [
    {
      navItem: 'Home',
      route: '/',
    },
    {
      navItem: 'Shop',
      route: '/shop',
    },
    {
      navItem: 'My Orders',
      route: '/my-orders',
    },
  ];

  constructor(
    private apiCall: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.getCartItemsLength();
    this.getFavoriteItemsLength();
  }

  /**
   * Function to get product category
   */
  getProductCategories() {
    let sub1 = this.apiCall
      .getTotalCategories({ isCategoryList: true })
      .subscribe({
        next: (res: any) => {
          if (res.type === 'success') {
            this.navCategories = res.data.categories;
            this.cdr.markForCheck();
            this.commonService.categories$.next(this.navCategories);
          }
        },
      });
    this.subscription.push(sub1);
  }

  getCartItemsLength() {
    let sub2 = this.apiCall.getCartProducts().subscribe({
      next: (res) => {
        if (res.type === 'success') {
          this.totalCartLength = res.data.products.length;
          this.commonService.CartItemsLength$.next(res.data.products.length);
          this.cdr.markForCheck();
        }
      },
    });
    this.subscription.push(sub2);
  }

  /**
   * Function to get total favorite items length.
   */
  getFavoriteItemsLength() {
    let sub3 = this.apiCall.getFavoriteProduct().subscribe({
      next: (res: any) => {
        if (res.type === 'success') {
          this.favoriteItemsLength = res.data.products.length;
          this.commonService.FavoriteItemLength$.next(res.data.products.length);
          this.cdr.markForCheck();
        }
      },
    });
    this.subscription.push(sub3);
  }

  //function for toggle category.
  categoryToggle(event?: any) {
    event.stopPropagation();
    this.isCollapsed = !this.isCollapsed;
    this.isNavActive = !this.isNavActive;
  }

  // function to toggle navbar and category on outside Click..
  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    this.isCollapsed = false;
    this.isNavActive = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
