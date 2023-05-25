import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  languageCode = new BehaviorSubject<any>({})

  constructor(
  ) { }

}
