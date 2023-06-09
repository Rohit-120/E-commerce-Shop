import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  loginForm = this.fb.group({
    email: [
      'rahul.p@webcodegenie.com',
      [Validators.required, Validators.email],
    ],
    password: ['rohit', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private apiCall: ApiService,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userLogin() {
    if (this.loginForm.valid) {
      let sub1 = this.authService.userLogin(this.loginForm.value).subscribe({
        next: (res) => {
            if (res.type === 'success') {
              this.authService.isLoggedIn.next(true);
              this.storageService.set('token', res.token);
              this.toastService.success(res.message, 'Logged in');
              this.router.navigate(['/dashboard']);
            } else {
              this.toastService.error(res.message, 'Login Error');
            }
        },
      });
      this.subscription.push(sub1);
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
