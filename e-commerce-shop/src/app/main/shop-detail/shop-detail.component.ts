import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ShopDetailComponent implements OnInit {

  singleProductId: any;
  singleProductDetails: any;

  // User Review Form..
  reviewForm : FormGroup = this.fb.group({
    rating : ['5', [Validators.required, Validators.max(5), Validators.min(1)]],
    reviewMessage : ['', Validators.required],
    name : ['', Validators.required],
    email : ['', [Validators.required, Validators.email]],
  })

  //User review object
  userReviews : any = [
    {
    userName : 'John Doe',
    date : new Date(),
    rating : 5,
    reviewMessage : 'Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.',
    name : '',
    email :''
    }
  ]

  constructor(
    private fb : FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private apiCall: ApiService,
    private activeRouter: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toast : ToastrService
  ) {
    // activeRouter.params.subscribe(params => {
    //   this.singleProductId = params['id'];
    //   cdr.markForCheck();
    // })
  }

  ngOnInit() {
    this.activeRouter.params.subscribe((param) => {
      this.singleProductId = param['id'];
      this.cdr.detectChanges();
    });
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Shop',
        url: 'shop',
      },
      {
        label: 'Shop Details',
        url: 'shop-details',
      },
    ]);

    
    this.apiCall.getSingleProduct(this.singleProductId).subscribe({
      next: (res) => {
        console.log(res, 'Singleproduct');
        this.singleProductDetails = res;
        this.cdr.markForCheck()
      },
    });
  }

  onReviewSubmit(){
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value, 'Review');
      
      this.userReviews.push({...this.reviewForm.value, userName : this.reviewForm.value.name, date : new Date()});
      this.reviewForm.reset();
    }else{
      this.toast.error('Enter valid information');
    }
  }
}
