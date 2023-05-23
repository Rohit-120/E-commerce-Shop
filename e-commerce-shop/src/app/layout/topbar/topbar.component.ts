import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  currencies: any = ['USD', 'EUR', 'GBP', 'CAD'];

  languages: any = ['EN', 'FR', 'AR', 'RU'];

  searchData: string = '';

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private currencyService: CurrencyChangeService
    ) {}

  ngOnInit(): void {
  }

  productSearchClick() {
    console.log(this.searchData, 'rohit');
    this.router.navigate([`shop/${this.searchData}`]);
  }

  onCurrencyChange(item:string){
    this.currencyChange = item;
    this.currencyService.currencyChanges.next(item)
  }
}
