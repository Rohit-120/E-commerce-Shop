import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  fav : BehaviorSubject<any> = new BehaviorSubject<any>('')

  totalCartItems = new BehaviorSubject<number>(1)
  favoriteItems = new Subject<number>()

  constructor() { }
}
