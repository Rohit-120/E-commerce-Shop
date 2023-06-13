import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  title: string = 'Billing Address';
  countries: string[] = [
    'India',
    'United States',
    'Afghanistan',
    'Albania',
    'Algeria',
  ];
  isShippingAddressEnabled = false;
  userAddressList: any[] = [];

  isAddressId!: string;
  userDefaultAddress: any;

  body: any = {
    // "title":"Home",
    // "name":"test testify",
    // "mobileNo":"+911234557890",
    // "addressLineOne":"Ganesh meredian Block-c",
    // "addressLineTwo":"Room No. 901",
    // "landmark":"Kargil Petrol Pump",
    // "country":"India",
    // "state":"Gujarat",
    // "city":"Ahmedabad",
    // "pincode":"387341",
    // addressLineOne : "A12, street 1"
    // addressLineTwo : "street 2"
    // city : "Ahmedabad"
    // country : "India"
    // landmark : "sola"
    // mobileNo : "6546565845"
    // name : "rahul"
    // state : "gujarat"
    // title : "Office"
    // zipcode : "365685"
  };

  addressBillingForm = this.fb.group({
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    // lastName :new FormControl('patel', Validators.required),
    // email :new FormControl('rahul@gmail.com', [Validators.required, Validators.email])  ,
    mobileNo: new FormControl('', Validators.required),
    addressLineOne: new FormControl('', Validators.required),
    addressLineTwo: new FormControl('', Validators.required),
    landmark: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
  });

  shippingAddressForm = this.fb.group({
    title: new FormControl('Home', Validators.required),
    name: new FormControl('lav', Validators.required),
    // lastName :new FormControl('rana', Validators.required),
    // email :new FormControl('lav12@gmail.com', [Validators.required, Validators.email])  ,
    mobileNo: new FormControl('9875463284', Validators.required),
    addressLineOne: new FormControl('A one Apartment', Validators.required),
    addressLineTwo: new FormControl('32 street', Validators.required),
    landmark: new FormControl('gota', Validators.required),
    country: new FormControl('India', Validators.required),
    city: new FormControl('Ahmedabad', Validators.required),
    state: new FormControl('Gujarat', Validators.required),
    pincode: new FormControl('389865', Validators.required),
  });

  orderBody: any = {
    shipToDifferentAddress: false,
    billingId: '647f2eacd46ac8d233e186d4',
    totalAmount: 500,
    shippingAmount: 100,
    paymentMethod: 'Cash on delivery',
  };

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private cdr: ChangeDetectorRef,
    private apiCall: ApiService
  ) {}

  ngOnInit(): void {
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
        label: 'Checkout',
        url: 'checkout',
      },
    ]);

    this.getAddressList();
  }

  placeOrder() {
    this.apiCall.placeOrder(this.orderBody).subscribe({
      next : (res) => {
        if(res.type === 'success') {
        this.toast.success(res.message, 'Order Placed');
        }
      }
    })

    // this.apiCall.addAddress(this.addressBillingForm.value).subscribe({
    //   next: (res) => {
    //     console.log(res.address, 'place order');
    //   },
    // });
  }

  shippingAddress(event: any) {
    if (event.target.checked) {
      console.log('tttt');
      this.isShippingAddressEnabled = true;
    } else {
      this.isShippingAddressEnabled = false;
    }
  }

  getAddressList() {
    let sub2 = this.apiCall.getAddressList().subscribe({
      next: (res) => {
        if (res.type === 'success') {
          this.userAddressList = res.data.addressBook;
          this.cdr.markForCheck();
          if (this.userAddressList) {
            this.userAddressList.find((address) => {
              if (address.title === 'Home') {
                this.addressBillingForm.patchValue(address);
                this.userDefaultAddress = address;
                this.cdr.markForCheck();
              }
            });
          }
        }
      },
    });

    this.subscription.push(sub2);
  }

  editAddress(address: any, action?: string, index?: any) {
    this.isAddressId = address.addressId;
    this.userDefaultAddress = address;
    console.log(address, 'addressChanged');

    if (action === 'change') {
      this.title = 'Update Address';
      this.addressBillingForm.patchValue(address);
    } else if (action === 'patch') {
      this.title = 'Billing Address';
      this.addressBillingForm.patchValue(address);
    }
  }

  updateAddress() {
    let sub3 = this.apiCall
      .updateAddress(this.isAddressId, this.addressBillingForm.value)
      .subscribe({
        next: (res) => {
          if (res.type === 'success') {
            this.toast.success(res.message, 'Updated');
          } else {
            this.toast.error(res.message, 'something went wrong!');
          }
        },
      });
    this.subscription.push(sub3);
  }

  removeAddress(addressId: string, index: number) {
    console.log(addressId, 'removeAddress');
    let sub4 = this.apiCall.removeAddress(addressId).subscribe({
      next: (res) => {
        if (res.type === 'success') {
          this.userAddressList.splice(index, 1);
          this.toast.show(res.message, 'Address Removed');
          this.cdr.markForCheck();
        } else {
          this.toast.error(res.message, 'Some error occurred');
        }
      },
    });
    this.subscription.push(sub4);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
