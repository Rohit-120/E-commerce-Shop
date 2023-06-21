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
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
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
  totalAmount!: number;
  isAddressId!: string;
  userDefaultAddress: any;
  currencyInfo: any;

  addressBillingForm = this.fb.group({
    title: new FormControl('Home', Validators.required),
    name: new FormControl('Rohit', Validators.required),
    mobileNo: new FormControl('+916545498689', Validators.required),
    addressLineOne: new FormControl('kargil petrol pupm', Validators.required),
    addressLineTwo: new FormControl(
      'near gujarat high court',
      Validators.required
    ),
    landmark: new FormControl('sola', Validators.required),
    country: new FormControl('india', Validators.required),
    city: new FormControl('Ahmadabad', Validators.required),
    state: new FormControl('Gujarat', Validators.required),
    pincode: new FormControl('385885', Validators.required),
  });

  shippingAddressForm = this.fb.group({
    title: new FormControl('Home', Validators.required),
    name: new FormControl('lav', Validators.required),
    mobileNo: new FormControl('+919875463284', Validators.required),
    addressLineOne: new FormControl('A one Apartment', Validators.required),
    addressLineTwo: new FormControl('32 street', Validators.required),
    landmark: new FormControl('Gota', Validators.required),
    country: new FormControl('India', Validators.required),
    city: new FormControl('Ahmadabad', Validators.required),
    state: new FormControl('Gujarat', Validators.required),
    pincode: new FormControl('389865', Validators.required),
  });

  totalProductToOrder: any;
  totalAmountOfProducts: any;

  orderBody: any = {
    shipToDifferentAddress: false,
    billingId: '',
    totalAmount: null,
    shippingAmount: 100,
    paymentMethod: 'Cash on delivery',
  };

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private cdr: ChangeDetectorRef,
    private apiCall: ApiService,
    private commonService: CommonService
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
    this.getCartDetails();
    this.getCurrencyInfo();
  }

  //To get Cart Item details using ApiService
  getCartDetails() {
    console.log('Get Cart Item Details called');

    let sub1 = this.commonService.totalCartItems$.subscribe({
      next: (res: any) => {
        console.log(res, 'cart details in checkout comp');
        this.totalProductToOrder = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);

    if (this.totalProductToOrder) {
       let sub2 = this.commonService.cartTotalAmount$.subscribe({
        next: (res: any) => {
          this.totalAmountOfProducts = res;
          this.cdr.markForCheck();
          console.log(this.totalAmountOfProducts, 'total amount');
        },
      });
      this.subscriptions.push(sub2);
    }
  }

  getCurrencyInfo() {
    let sub3 = this.commonService.currencyChanges$.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub3);
  }

  placeOrder() {
    //if billing and shipping address are same
    if (!this.isShippingAddressEnabled) {
      console.log('place order called');
      this.orderBody.billingId = this.userDefaultAddress.addressId;
      this.orderBody.totalAmount = this.totalAmountOfProducts.total;
      console.log(this.orderBody, 'lllllllllllllllllllllllllllllllllllll');

     let sub4 = this.apiCall.placeOrder(this.orderBody).subscribe({
        next: (res) => {
          console.log(res, 'place order');
          if (res.type === 'success') {
            this.toastService.success(res.message, 'Order Placed');
          }
        },
      });
      this.subscriptions.push(sub4);
    } //if billing and shipping address are different
    else {
      if (this.shippingAddressForm.valid) {
        //to add shipping address to user address list
       let sub5 = this.apiCall.addAddress(this.shippingAddressForm.value).subscribe({
          next: (res) => {
            console.log(res.addedAddressId, 'place order');
            //if shipping address is added to user list place order with different address
            if (res.addedAddressId) {
              this.orderBody.billingId = this.userDefaultAddress.addressId;
              this.orderBody.deliveryId = res.addedAddressId;
              this.orderBody.totalAmount = this.totalAmountOfProducts.total;
              this.orderBody.shipToDifferentAddress = true;

              let sub6 = this.apiCall.placeOrder(this.orderBody).subscribe({
                next: (res) => {
                  console.log(res, 'Place Order with shipping address');
                  if (res.type === 'success') {
                    this.toastService.success(res.message, 'Order Placed');
                  }
                },
              });
              this.subscriptions.push(sub6);
            }
          },
        });
        this.subscriptions.push(sub5);
      } else {
        this.toastService.info('Please enter valid information !');
      }
    }
  }

  shippingAddress(event: any) {
    if (event.target.checked) {
      this.isShippingAddressEnabled = true;
    } else {
      this.isShippingAddressEnabled = false;
    }
  }

  getAddressList() {
    let sub7 = this.apiCall.getAddressList().subscribe({
      next: (res) => {
        console.log('Res', res);
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

    this.subscriptions.push(sub7);
  }

  editAddress(address: any, action?: string, index?: any) {
    this.isAddressId = address.addressId;
    this.userDefaultAddress = address;

    if (action === 'change') {
      this.title = 'Update Address';
      this.addressBillingForm.patchValue(address);
    } else if (action === 'patch') {
      this.title = 'Billing Address';
      this.addressBillingForm.patchValue(address);
    }
  }

  updateAddress() {
    let sub8 = this.apiCall
      .updateAddress(this.isAddressId, this.addressBillingForm.value)
      .subscribe({
        next: (res) => {
          if (res.type === 'success') {
            this.toastService.success(res.message, 'Updated');
          } else {
            this.toastService.error(res.message, 'something went wrong!');
          }
        },
      });
    this.subscriptions.push(sub8);
  }

  removeAddress(addressId: string, index: number) {
    console.log(addressId, 'removeAddress');
    let sub9 = this.apiCall.removeAddress(addressId).subscribe({
      next: (res) => {
        if (res.type === 'success') {
          this.userAddressList.splice(index, 1);
          this.toastService.show(res.message, 'Address Removed');
          this.cdr.markForCheck();
        } else {
          this.toastService.error(res.message, 'Some error occurred');
        }
      },
    });
    this.subscriptions.push(sub9);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
