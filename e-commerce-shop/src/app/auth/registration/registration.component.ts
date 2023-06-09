import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {
  subscription: Subscription[] =[]
  registrationForm = this.fb.group({
    name: ['rahul', Validators.required],
    email: [
      'rahul.p@webcodegenie.com',
      [Validators.required, Validators.email],
    ],
    password: ['rohit', Validators.required],
    country: ['india', Validators.required],
    mobile: ['+919865625550', Validators.required],
    timezone: ['UTC+05:30'],
    language: ['English', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  userRegistration() {
    if (this.registrationForm.valid) {
      let sub1 = this.authService.userRegistration(this.registrationForm.value).subscribe({
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
