import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
// breadcrumb 
  breadcrumb = new BehaviorSubject<any>([{
    label: 'Home',
    url : '/'
  }]);     

  constructor() { }
}
