import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
// breadcrumb 
  breadcrumb = new Subject<any>();     

  constructor() { }
}
