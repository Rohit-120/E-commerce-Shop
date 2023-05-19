import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  totalCartItems = new Subject<number>()
  favoriteItems = new Subject<number>()

  constructor() { }
}
