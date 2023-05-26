import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendors : any = [
    // {
    //   image : 'assets/img/vendor-1.jpg',
    // },
    // {
    //   image : 'assets/img/vendor-2.jpg',
    // },
    // {
    //   image : 'assets/img/vendor-3.jpg',
    // },
    // {
    //   image : 'assets/img/vendor-4.jpg',
    // },
    // {
    //   image : 'assets/img/vendor-5.jpg',
    // },
    // {
    //   image : 'assets/img/vendor-6.jpg',
    // },
    // {
    //   image : 'assets/img/vendor-7.jpg',
    // },
    // {
    //   image : 'assets/img/vendor-8.jpg',
    // },
  ]

  constructor(
    private apiCall : ApiService,
    private cdr : ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.companyImage()
  }

  companyImage(): any {
    this.apiCall.getCompanyImage().subscribe({
      next : (res : any) => {
         this.vendors  = res.data.images
         this.cdr.markForCheck();
        
      }
    })
  }

}
