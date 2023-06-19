import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    resetOtp: ['', Validators.required],
    newPassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  sentOtp() {
    console.log(this.resetPasswordForm.value.email);
    this.authService
      .forgotPassword({ email: this.resetPasswordForm.value.email })
      .subscribe({
        next: (res) => {
          if (res.type === 'success') {
            console.log(res, 'otpSent');
            this.toastService.success(
              res.message,
              'OTP sent successfully to your Email'
            );
          }
        },
      });
  }
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          if (res.type === 'success') {
            console.log(res, 'resetPassword');
            this.toastService.success(res.message, 'Password reset successfully');
            this.router.navigate(['/auth/login']);
          }else{
            this.toastService.warning('', 'Something went Wrong');
          }
        },
      });
    }
  }
}
