import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }


  getRequest(url : string) {
    return this.http.get(url);
  }

  postRequest(url : string, body? : any) {
    return this.http.post(url, body);
  }

  deleteRequest(url : string, item : any) {
    return this.http.delete(url, item);
  }

}
