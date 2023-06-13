import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service'; 

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  vendors : any = []

  constructor(
    private apiCall : ApiService,
    private cdr : ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.companyImage()
  }

  companyImage(): any {
    let sub1 = this.apiCall.getCompanyImage().subscribe({
      next : (res : any) => {
         this.vendors  = res.data
         this.cdr.markForCheck();
        
      }
    })
    this.subscriptions.push(sub1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }


}
