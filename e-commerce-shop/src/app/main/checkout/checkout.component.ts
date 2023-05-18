import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  isShippingAddressDifferent = false;
  countries : string[] = ['United States', 'Afghanistan', 'Albania', 'Algeria'];

  addressForm : FormGroup = new FormGroup({
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

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb : FormBuilder
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
    if (this.addressForm.valid) {
      console.log(this.addressForm.value, 'address form');
      
    }
  }
}
