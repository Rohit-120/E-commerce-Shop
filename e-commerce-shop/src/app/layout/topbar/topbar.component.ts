import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { CurrencyChangeService } from 'src/app/shared/services/currency-change.service';

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

  myAccount: any = {
    title: 'My Account',
    signIn: 'Sign In',
    signUp: 'Sign Up',
  };

  // object to select currency and Language

  currencyChange: string = 'USD';
  languageLabel!: string;

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
  ];

  searchData: string = '';

  constructor(
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private apiCall: ApiService
  ) {}

  ngOnInit(): void {}

  productSearchClick() {
    this.commonService.dataFromSearchInput.next(this.searchData);

    this.router.navigate([`shop/${this.searchData}`]);
  }

  onCurrencyChange(item: any) {
    let name = item.name;
    let price = item.currencyPrice;
    this.currencyChange = item.name;
    this.commonService.currencyChanges.next({
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
}
