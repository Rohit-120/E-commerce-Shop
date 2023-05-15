import { Component, OnInit } from '@angular/core';

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
 
    currencies: any = {
      USD: 'USD',
      EUR: 'EUR',
      GBP: 'GBP',
      CAD: 'CAD',
    }

    languages:any = {
       EN: 'EN',
       FR: 'FR',
       AR: 'AR',
       RU: 'RU',
    }
  

  constructor() {}

  ngOnInit(): void {}
}
