import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopDetailComponent implements OnInit, OnDestroy {
  singleProductId: any;
  singleProductDetails: any;
  currencyInfo: any;
  subscriptions: Subscription[] = [];
  detailNavbar: any[] = ['Description', 'Information', 'Reviews'];
  navbarToggle: any = 0;
  productReviews: any[] = [];

  // User Review Form..
  reviewForm: FormGroup = this.fb.group({
    rating: ['5', [Validators.required, Validators.max(5), Validators.min(1)]],
    reviewMessage: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  //User review object
  userReviews: any = [
    {
      userName: 'John Doe',
      date: new Date(),
      rating: 5,
      reviewMessage:
        'Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.',
      name: '',
      email: '',
    },
  ];

  body: any = {
    quantity: 1,
  };

  constructor(
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private apiCall: ApiService,
    private activeRouter: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastService: ToastrService,
    public commonService: CommonService
  ) {
    // activeRouter.params.subscribe(params => {
    //   this.singleProductId = params['id'];
    //   cdr.markForCheck();
    // })
  }

  ngOnInit() {
    this.activeRouter.params.subscribe((param) => {
      this.singleProductId = param['id'];
      this.cdr.markForCheck();
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

    this.getSingleProductDetails();
    this.getCurrencyInfo();
  }

  getSingleProductDetails() {
    let sub1 = this.apiCall.getSingleProduct(this.singleProductId).subscribe({
      next: (res) => {
        console.log(res, 'single product details');
        
        this.singleProductDetails = res.data.product;
        
        //Incase if there is review added to product details.
        if (res.data.product.reviews.length) {
          this.productReviews = res.data.product.reviews;
        }
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }
  //TODO:
  addToCart() {
    let sub2 = this.commonService
      .addToCartClick(this.singleProductId, this.body.quantity, false)
      .subscribe({
        next: (res) => {
          if (res.type === 'success') {
            this.toastService.success(res.message, 'Added to cart');
          } else {
            this.toastService.error(res.message, 'Error while add to cart');
          }
        },
      });
    this.body.quantity = 1;
    this.subscriptions.push(sub2);
  }

  changeQuantity() {
    let sub3 = this.apiCall
      .changeCartQuantity({
        productId: this.singleProductId,
        quantity: this.body.quantity,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    this.subscriptions.push(sub3);
  }

  /**
   * @param index number of the Cart object
   * Increase the Cart Quantity
   */
  increase() {
    this.body.quantity++;
    // this.changeQuantity();
  }

  /**
   * @param index number of the Cart object
   * Decrease the Cart Quantity
   */
  decrease() {
    if (this.body.quantity > 0) {
      this.body.quantity--;
      // this.changeQuantity();
    }
  }

  onReviewSubmit() {
    if (this.reviewForm.valid) {
      this.body.productId = this.singleProductId;
      this.body.rating = this.reviewForm.value.rating;
      this.body.review = this.reviewForm.value.reviewMessage;

      console.log(this.body, 'review body///////////////////');
      
      let sub4 = this.apiCall.addReview(this.body).subscribe({
        next: (res) => {
          if (res) {
            this.toastService.success(res.message, 'Review Submitted');
          }
        },
      });
      this.subscriptions.push(sub4);
      this.reviewForm.reset();
    } else {
      this.toastService.error('Enter valid information');
    }
  }

  getCurrencyInfo() {
    let sub5 = this.commonService.currencyChanges$.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub5);
  }

  navbarClick(index: number) {
    this.navbarToggle = index;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

// review submit data//

// if (this.reviewForm.valid) {
//   this.userReviews.push({
//     ...this.reviewForm.value,
//     userName: this.reviewForm.value.name,
//     date: new Date(),
//   });
//   this.reviewForm.reset();
// } else {
//   this.toastService.error('Enter valid information');
// }
