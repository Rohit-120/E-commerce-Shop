import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, subscribeOn } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  topbarNavItems: any = [
    {
      navItem: 'About',
      route: 'about',
    },
    {
      navItem: 'Contact',
      route: 'contact',
    },
    {
      navItem: 'Help',
      route: 'help',
    },
    {
      navItem: 'FAQs',
      route: 'faqs',
    },
  ];

  isLogin: boolean = false;

  // object to select currency and Language

  currencyChange: string = 'USD';
  languageLabel!: string;
  totalCartLength!: number;
  totalFavoriteLength!: number;

  currencies: any = [
    { name: 'USD', currencyPrice: 1 },
    { name: 'EUR', currencyPrice: 0.92 },
    { name: 'GBP', currencyPrice: 0.8 },
    { name: 'CAD', currencyPrice: 1.35 },
    { name: 'INR', currencyPrice: 82.7 },
    { name: 'AUD', currencyPrice: 1.51 },
    { name: 'JPY', currencyPrice: 138.5 },
  ];

  languages: any = [
    { label: 'EN', code: 'en' },
    { label: 'FR', code: 'fr' },
    { label: 'AR', code: 'ar' },
    { label: 'RU', code: 'ru' },
    { label: 'GU', code: 'gu' },
  ];

  searchData: string = '';
  userDetails: any;
  subscriptions: Subscription[] = [];
  constructor(
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private apiCall: ApiService,
    private storageService: StorageService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.checkCartItemLength();
    this.checkFavoriteItemLength();
    this.getUserName();
    this.getSomething();
    this.checkTokenValidation();
  }

  getSomething() {
    console.log( this.authService.isAuthTokenValid());
    
  }

  checkLoginStatus() {
    let sub1 = this.authService.isLoggedIn$.subscribe({
      next: (res) => {
        if (res) {
          this.isLogin = res;
        } else if (this.storageService.get('token')) {
          this.isLogin = true;
        }
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }

  checkFavoriteItemLength(){
    let sub2 = this.commonService.FavoriteItemLength$.subscribe({
      next: (res) => {
        this.totalFavoriteLength = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub2);
  }

  checkCartItemLength() {
    let sub2 = this.commonService.CartItemsLength$.subscribe({
      next: (res : any) => {
        this.totalCartLength = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub2);
  }

  productSearchClick() {
    this.commonService.dataFromSearchInput$.next(this.searchData);
    this.router.navigate([`/shop`]);
  }

  onCurrencyChange(item: any) {
    let name = item.name;
    let price = item.currencyPrice;
    this.currencyChange = item.name;
    this.commonService.currencyChanges$.next({
      currencyName: name,
      currencyPrice: price,
    });
  }

  onLanguageChange(language: any) {
    this.languageLabel = language.label;
    let lanCode = language.code;

    console.log(language.code);

    document.cookie = 'googtrans=' + `/en/${lanCode}`;
    // this.cdr.markForCheck()
    location.reload();
  }

  getUserName() {
    this.userDetails = this.authService.decodeToken();
    console.log('this.userDetails ====> ', this.userDetails, );
    
    this.cdr.markForCheck();
  }

  checkTokenValidation(){
    setInterval(() => {
      this.authService.isAuthTokenValid();
    },500000)
  }  

  logOut() {
    if (this.storageService.get('token')) {
      console.log(
        'logOut',
        this.storageService.get('token'),
        typeof this.storageService.get('token')
      );

      this.authService.userLogout().subscribe({
        next: (res) => {
          console.log('user logout succesfully', res);
          if (res) {
            this.storageService.remove('token');
            this.authService.isLoggedIn$.next(false);
            this.router.navigate(['/auth/login']);
            this.toastService.warning(res.message, 'Logged out');
          }
        },
      });
    }
  }

}
