import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailSignUp: FormGroup = this.fb.group({
   email : ['', Validators.required]
  })

  constructor(
    private fb : FormBuilder,
    private apiCall : ApiService
  ) { }

  ngOnInit(): void {
  }

  onSignUp(){
      if (this.emailSignUp.valid){
        console.log('email =====> ', this.emailSignUp.controls['email'].value);
        // this.apiCall.emailSignUp({userEmail : this.emailSignUp.controls['email'].value}).subscribe({
        //   next : (res : any) => {
        //     console.log(res, 'emailResponse');
            
        //   }
        // })
      }
  }

}
