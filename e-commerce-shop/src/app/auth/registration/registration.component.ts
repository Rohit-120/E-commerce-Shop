import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  subscription: Subscription[] =[]
  registrationForm = this.fb.group({
    name: ['rohit', Validators.required],
    email: [
      'rohit.p@webcodegenie.com',
      [Validators.required, Validators.email],
    ],
    password: ['rohit', Validators.required],
    country: ['india', Validators.required],
    mobile: ['+919865625548', Validators.required],
    timezone: ['UTC+05:30'],
    language: ['English', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private apiCall: ApiService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  userRegistration() {
    if (this.registrationForm.valid) {
      let sub1 = this.apiCall.userRegistration(this.registrationForm.value).subscribe({
        next: (res) => {
          if (res.type === 'success') {
            this.toastService.success(res.message);
            this.router.navigate(['/auth/login']);
          } else {
            this.toastService.error(res.message, 'Registration Error');
          }
        },
      });
      this.subscription.push(sub1);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
