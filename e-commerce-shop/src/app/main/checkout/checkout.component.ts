import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {

  countries : string[] = ['India', 'United States', 'Afghanistan', 'Albania', 'Algeria'];
  isShippingAddressEnabled = false;

  body : any = {
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

    // addressLine1: "A12, street 1",
    // addressLine2: "street 2",
    // city: "Ahmedabad",
    // country: "India",
    // email:"rahul@gmail.com",
    // firstName: "rahul",
    // landMark: "sola",
    // lastName: "patel",
    // phone: "6546565845",
    // state: "gujarat",
    // title: "Office",
    // zipCode: "365685",
 }
 
  

  addressBillingForm : FormGroup = new FormGroup({
    title : new FormControl('Office', Validators.required),
    firstName : new FormControl('rahul', Validators.required),
    lastName :new FormControl('patel', Validators.required),
    email :new FormControl('rahul@gmail.com', [Validators.required, Validators.email])  ,
    phone : new FormControl('6546565845', Validators.required),
    addressLine1 : new FormControl('A12, street 1', Validators.required),
    addressLine2 :new FormControl('street 2', Validators.required),
    landMark :new FormControl('sola', Validators.required),
    country : new FormControl('India', Validators.required),
    city : new FormControl('Ahmedabad', Validators.required),
    state : new FormControl('gujarat', Validators.required),
    zipCode : new FormControl('365685', Validators.required),
  })


  shippingAddressForm : FormGroup = new FormGroup({
    title : new FormControl('Home', Validators.required),
    firstName : new FormControl('lav', Validators.required),
    lastName :new FormControl('rana', Validators.required),
    email :new FormControl('lav12@gmail.com', [Validators.required, Validators.email])  ,
    phone : new FormControl('9875463284', Validators.required),
    addressLine1 : new FormControl('A one Apartment', Validators.required),
    addressLine2 :new FormControl('32 street', Validators.required),
    landMark :new FormControl('gota', Validators.required),
    country : new FormControl('India', Validators.required),
    city : new FormControl('Ahmedabad', Validators.required),
    state : new FormControl('Gujarat', Validators.required),
    zipCode : new FormControl('389865', Validators.required),

  })

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb : FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private apiCall : ApiService
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
    if (this.addressBillingForm.valid) {
      let data = this.addressBillingForm.value
      console.log(this.addressBillingForm.value, 'address form')

      this.body.title = data.title,
      this.body.name = data.firstName + " " + data.lastName,
      this.body.mobileNo = data.phone ,
      this.body.addressLineOne = data.addressLine1,
      this.body.addressLineTwo = data.addressLine2,
      this.body.landmark = data.landMark ,
      this.body.country = data.country,
      this.body.state = data.state,
      this.body.city = data.city,
      this.body.pincode = data.zipCode
    }
    console.log(this.body, 'address form.......neww');
    this.apiCall.addAddress(this.body).subscribe({
      next : (res) => {
        if(res.type === 'success'){
          this.toast.success(res.message, 'Successful')
        }
        
      }
    })    
  }
  
  shippingAddress(event : any){
    if(event.target.checked){
      console.log('tttt');
      this.isShippingAddressEnabled = true;
    }else{
      this.isShippingAddressEnabled = false;
    }
        
  }
  
}
