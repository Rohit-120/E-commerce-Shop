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
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
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
    mobileNo: new FormControl('9875463284', Validators.required),
    addressLineOne: new FormControl('A one Apartment', Validators.required),
    addressLineTwo: new FormControl('32 street', Validators.required),
    landmark: new FormControl('gota', Validators.required),
    country: new FormControl('India', Validators.required),
    city: new FormControl('Ahmedabad', Validators.required),
    state: new FormControl('Gujarat', Validators.required),
    pincode: new FormControl('389865', Validators.required),
  });

  totalProductToOrder: any;
  totalAmountOfProducts: any;
  orderBody: any = {
    shipToDifferentAddress: false,
    billingId: '',
    totalAmount: 500,
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
    this.getCurrencyInfo()
  }

  //To get Cart Item details using ApiService
  getCartDetails() {
    console.log('Get Cart Item Details called');
    
    let sub1 = this.commonService.totalCartItems.subscribe({
      next: (res: any) => {
        console.log(res, 'cart details in checkout comp');
          this.totalProductToOrder = res;
          this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);

    if (this.totalProductToOrder) {
      this.commonService.cartTotalAmount.subscribe({
        next : (res: any) => {
         this.totalAmountOfProducts = res
         this.cdr.markForCheck();
        }
      })
    }
  }


  getCurrencyInfo() {
    let sub4 = this.commonService.currencyChanges.subscribe({
      next: (res) => {
        console.log(res, 'currentCurrency');
        
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub4);
  }

  placeOrder() {
    //if billing and shipping address are same
    if (!this.isShippingAddressEnabled) {
      this.orderBody.billingId = this.userDefaultAddress.addressId;
      this.apiCall.placeOrder(this.orderBody).subscribe({
        next: (res) => {
          if (res.type === 'success') {
            this.toastService.success(res.message, 'Order Placed');
          }
        },
      });
    } //if billing and shipping address are different
    else {
      if (this.shippingAddressForm.valid) {
        //to add shipping address to user address list
        this.apiCall.addAddress(this.shippingAddressForm.value).subscribe({
          next: (res) => {
            console.log(res.addedAddressId, 'place order');
            //if shipping address is added to user list place order with different address
            if (res.addedAddressId) {
              this.orderBody.billingId = this.userDefaultAddress.addressId;
              this.orderBody.deliveryId = res.addedAddressId;
              this.orderBody.shipToDifferentAddress = true;

              this.apiCall.placeOrder(this.orderBody).subscribe({
                next: (res) => {
                  console.log(res, 'Place Order with shipping address');

                  if (res.type === 'success') {
                    this.toastService.success(res.message, 'Order Placed');
                  }
                },
              });
            }
          },
        });
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
    let sub2 = this.apiCall.getAddressList().subscribe({
      next: (res) => {
        console.log("Res",res)
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

    this.subscriptions.push(sub2);
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
            this.toastService.success(res.message, 'Updated');
          } else {
            this.toastService.error(res.message, 'something went wrong!');
          }
        },
      });
    this.subscriptions.push(sub3);
  }

  removeAddress(addressId: string, index: number) {
    console.log(addressId, 'removeAddress');
    let sub4 = this.apiCall.removeAddress(addressId).subscribe({
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
    this.subscriptions.push(sub4);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
