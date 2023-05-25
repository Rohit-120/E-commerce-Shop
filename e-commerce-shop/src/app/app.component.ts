import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-commerce-shop';

  ngOnInit(): void {
    if(document.cookie.includes('googtrans')){
      return;
    }
    else{
      document.cookie = 'googtrans=' + '/en/en'
    }
    // document.cookie = 'googtrans=' + '/en/en'
    // console.log(document.cookie.includes('googtrans'), 'kkkkkkkkkkkkkkkkkkk');
    

  }

}
