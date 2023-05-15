import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.scss']
})
export class SpecialOfferComponent implements OnInit {

  // Object for Home Offer Section
  specialOfferItem = [
    {
      image : '/assets/img/offer-1.jpg',
      title : 'Special Offer',
      discount : 'Save 20%',
      button : 'Shop Now',
    },
    {
      image : '/assets/img/offer-2.jpg',
      title : 'Special Offer',
      discount : 'Save 20%',
      button : 'Shop Now',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
