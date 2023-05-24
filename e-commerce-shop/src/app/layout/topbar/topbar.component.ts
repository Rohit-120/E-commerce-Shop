import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { CurrencyChangeService } from 'src/app/shared/services/currency-change.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
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

  currencies: any = [
    {name : 'USD', currencyPrice : 1}, 
    {name : 'EUR', currencyPrice : 0.92}, 
    {name : 'GBP', currencyPrice : 0.80}, 
    {name : 'CAD', currencyPrice : 1.35},
    {name : 'INR', currencyPrice : 82.7},
    {name : 'AUD', currencyPrice : 1.51},
    {name : 'JPY', currencyPrice : 138.5},



  ];

  languages: any = ['EN', 'FR', 'AR', 'RU'];

  searchData: string = '';

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private currencyService: CurrencyChangeService,
    private commonService: CommonService
    ) {}

  ngOnInit(): void {
  }

  productSearchClick() {
    this.commonService.dataToSearch.next(this.searchData);   
    // this.router.navigate([`shop/${this.searchData}`]);
  }

  onCurrencyChange(item:any){
    let name = item.name;
    let price = item.currencyPrice;
    this.currencyChange = item.name;
    this.commonService.currencyChanges.next({currencyName: name, currencyPrice: price})
    
  }
}
  