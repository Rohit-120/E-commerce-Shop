import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  countries : string[] = ['United States', 'Afghanistan', 'Albania', 'Algeria'];
  isShippingAddressEnabled = false;
  

  addressBillingForm : FormGroup = new FormGroup({
    fullName : new FormGroup({
      firstName : new FormControl('rohit', Validators.required),
      lastName :new FormControl('rohit', Validators.required),
    }),
    email :new FormControl('rohit@ss.com', [Validators.required, Validators.email])  ,
    phone : new FormControl('65465', Validators.required),
    address : new FormGroup({
      line1 : new FormControl('rohit', Validators.required),
      line2 :new FormControl('rohit', Validators.required),
    }),
    country : new FormControl('rohit', Validators.required),
    city : new FormControl('rohit', Validators.required),
    state : new FormControl('rohit', Validators.required),
    zipcode : new FormControl('12', Validators.required),
  })


  addressShippingForm : FormGroup = new FormGroup({
    fullName : new FormGroup({
      firstName : new FormControl('lav', Validators.required),
      lastName :new FormControl('lav', Validators.required),
    }),
    email :new FormControl('lav@ss.com', [Validators.required, Validators.email])  ,
    phone : new FormControl('12533534', Validators.required),
    address : new FormGroup({
      line1 : new FormControl('lav', Validators.required),
      line2 :new FormControl('lav', Validators.required),
    }),
    country : new FormControl('lav', Validators.required),
    city : new FormControl('lav', Validators.required),
    state : new FormControl('lav', Validators.required),
    zipcode : new FormControl('1221', Validators.required),

  })

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb : FormBuilder,
    private toast: ToastrService,
    private router: Router
  ) { }

 

  
  ngOnInit(): void {
    
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url : '/',
      },
      {
        label: 'Shop',
        url : 'shop',
      },
      {
        label: 'Checkout',
        url : 'checkout',
      }
    ])
  }
  
  onAddressSubmit(){
    if (this.addressBillingForm.valid && this.addressShippingForm.valid) {
      // console.log(this.addressBillingForm.value, 'address form');
      // console.log(this.addressShippingForm.value, ' Shipping address ');
      this.toast.success('your order has been placed successfully');
      this.router.navigate(['dashboard'])
    }
  } 
}
