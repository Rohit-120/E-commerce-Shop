import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  favorite : BehaviorSubject<any> = new BehaviorSubject<any>('')
  FavoriteItemLength = new BehaviorSubject<any>('');
  totalCartItems = new BehaviorSubject<any>('')
  favoriteItems = new Subject<number>();
  categories = new BehaviorSubject<any[]>([]);

  currencyChanges  = new BehaviorSubject<any>({currencyName : 'USD', currencyPrice : 1});

  //user search input fields of products.
  dataFromSearchInput = new BehaviorSubject<any>('')

  constructor(
    private apiService: ApiService,
  ) { }

  
}
