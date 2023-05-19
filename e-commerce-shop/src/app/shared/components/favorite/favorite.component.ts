import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  constructor(
    private apiCall : ApiService
  ) { }

  ngOnInit(): void {
    this.getFavoriteItems();
  }

  getFavoriteItems(){
    this.apiCall.getAllProduct().subscribe({
      next : (res) => {
        console.log(res, 'kkkkkkkkkkkkkkkkkkkkkkkkkkk');
        
      }
    })
  }

}

