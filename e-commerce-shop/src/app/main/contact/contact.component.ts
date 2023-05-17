import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // contactForm : any;
    contactForm : FormGroup = this.fb.group({
    name : ['', Validators.required],
    email : ['', Validators.required],
    subject : ['', Validators.required],
    message : ['', Validators.required]

  })
  
  constructor(
    private fb : FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private toastService: ToastrService
    ) { }
    
    ngOnInit(): void {
    // this.contactForm = this.fb.group({
    //   name : ['', Validators.required],
    //   email : ['', Validators.required],
    //   subject : ['', Validators.required],
    //   message : ['', Validators.required]
  
    // })

    this.breadcrumbService.breadcrumb.next([
    {
      label: 'Home',
      url : '/',
    },
    {
      label: 'Contact',
      url : 'contact',
    }])
  }

  onSubmit(){
    if (this.contactForm.valid) {
      this.toastService.success('message sent Successfully')
    }else{
      this.toastService.error('Please enter valid information')
    }
  }

  
}
