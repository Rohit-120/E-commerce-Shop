import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service'; 

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendors : any = [ ]

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
         this.vendors  = res.data
         this.cdr.markForCheck();
        
      }
    })
  }

}
