import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Object for Home carousel Section
  homeCarouselItem = [
    {
      title : 'Men Fashion',
      description : 'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      button : 'Shop Now',
      image : '/assets/img/carousel-1.jpg'
    },
    {
      title : 'Women Fashion',
      description : 'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      button : 'Shop Now',
      image : '/assets/img/carousel-2.jpg'
    },
    {
      title : 'Kids Fashion',
      description : 'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      button : 'Shop Now',
      image : '/assets/img/carousel-3.jpg'
    },
  ];

   

  features = [
  {
    feature : 'Quality Product',
    icon : 'fa fa-check'
  },
  {
    feature : 'Free Shipping',
    icon : 'fa fa-shipping-fast'
  },
  {
    feature : '14-Day Return',
    icon : 'fas fa-exchange-alt'
  },
  {
    feature : '24/7 Support',
    icon : 'fa fa-phone-volume'
  },

]

  constructor(
    private breadcrumbService: BreadcrumbService,
    private apiCall : ApiService,
    private commonService: CommonService
    ) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb.next([{
      label: 'Home',
      url : '/'
    }])

  
  }

}
