import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }

  set(key:string, data:any){
    localStorage.setItem(key, data);  
  }

  get(key:string){
    const data : any = localStorage.getItem(key); 
    return data   
  } 

  remove(key:string){
    return localStorage.removeItem(key);
    
  }


  
}
