import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendors = [
    {
      image : 'assets/img/vendor-1.jpg',
    },
    {
      image : 'assets/img/vendor-2.jpg',
    },
    {
      image : 'assets/img/vendor-3.jpg',
    },
    {
      image : 'assets/img/vendor-4.jpg',
    },
    {
      image : 'assets/img/vendor-5.jpg',
    },
    {
      image : 'assets/img/vendor-6.jpg',
    },
    {
      image : 'assets/img/vendor-7.jpg',
    },
    {
      image : 'assets/img/vendor-8.jpg',
    },
  ]

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    width : 1000,
    loop : true,
    autoplay : true,
    
    setWrapperSize : true,
    effect : 'slide'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
