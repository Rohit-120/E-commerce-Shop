import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  favorite : BehaviorSubject<any> = new BehaviorSubject<any>('')
  FavoriteItemLength = new BehaviorSubject<any>('');
  CartItemsLength = new BehaviorSubject<any>(null)
  // favoriteItems = new Subject<number>();
  categories = new BehaviorSubject<any[]>([]);

  currencyChanges  = new BehaviorSubject<any>({currencyName : 'USD', currencyPrice : 1});

  //user search input fields of products.
  dataFromSearchInput = new BehaviorSubject<any>('')

  totalCartItems = new BehaviorSubject<any[]>([]);
  cartTotalAmount = new BehaviorSubject<any>({});
   

  constructor(
    private apiService: ApiService,
  ) { }


  // addToCartClick(isAddedFrom:boolean,id: any,qty: number) {
  //   console.log('addToCart =====>  ', id);
  //  this.apiService
  //     .addToCart({ isAddedFromShop: isAddedFrom, productId: id, quantity: qty })
  //     .subscribe({
  //       next: (res: any) => {
  //         if (res.type === 'success') {
  //           this.toastService.success(res.message, 'Added to cart');
  //         }
  //       },
  //     });
  // }

  addToCartClick(id: any, qty: number, isAddedFrom?:boolean):Observable<any>{
    console.log({ isAddedFromShop: isAddedFrom, productId: id, quantity: qty });
    
    // this.commonService.CartItemsLength.next(this.CartItemsLength)
    return this.apiService.addToCart({ isAddedFromShop: isAddedFrom, productId: id, quantity: qty })
  }


  
}
