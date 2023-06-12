import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  countries: string[] = [
    'India',
    'United States',
    'Afghanistan',
    'Albania',
    'Algeria',
  ];
  isShippingAddressEnabled = false;
  userAddressList: any[] = [];

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
    title: new FormControl('Office', Validators.required),
    name: new FormControl('rahul', Validators.required),
    // lastName :new FormControl('patel', Validators.required),
    // email :new FormControl('rahul@gmail.com', [Validators.required, Validators.email])  ,
    mobileNo: new FormControl('6546565845', Validators.required),
    addressLineOne: new FormControl('A12, street 1', Validators.required),
    addressLineTwo: new FormControl('street 2', Validators.required),
    landmark: new FormControl('sola', Validators.required),
    country: new FormControl('India', Validators.required),
    city: new FormControl('Ahmedabad', Validators.required),
    state: new FormControl('gujarat', Validators.required),
    pincode: new FormControl('365685', Validators.required),
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

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
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

  onAddressSubmit() {
    if (this.addressBillingForm.valid) {
      let data = this.addressBillingForm.value;
    }
    this.apiCall.addAddress(this.addressBillingForm.value).subscribe({
      next: (res) => {
        if (res.type === 'success') {
          this.toast.success(res.message, 'Successful');
        }
      },
    });
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
    this.apiCall.getAddressList().subscribe({
      next: (res) => {
        console.log(res, 'addressBook');
        
        this.userAddressList = res.data.addressBook;
        this.cdr.markForCheck();
      },
    });
  }

  onAddressChange(address: any) {
    console.log(address, 'addressChanged');
    this.addressBillingForm.patchValue(address)
  }

  removeAddress(addressId: string, index : number) {
    console.log(addressId, 'removeAddress');
    this.apiCall.removeAddress(addressId).subscribe({
      next : (res) => {
        if(res.type === 'success') {
          this.userAddressList.splice(index , 1)
          this.toast.show(res.message, 'Address Removed')
          this.cdr.markForCheck();
        } else {
          this.toast.error(res.message,'Some error occurred')
        }
        
      }
    })
  }
}
