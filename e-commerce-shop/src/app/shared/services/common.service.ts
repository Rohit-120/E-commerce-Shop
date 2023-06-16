import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  FavoriteItemLength$ = new BehaviorSubject<any>(0);
  CartItemsLength$: any = new BehaviorSubject<number>(0);
  categories$ = new BehaviorSubject<any[]>([]);
  currencyChanges$ = new BehaviorSubject<any>({
    currencyName: 'USD',
    currencyPrice: 1,
  });

  //user search input fields of products.
  dataFromSearchInput$ = new BehaviorSubject<any>('');

  totalCartItems$ = new BehaviorSubject<any[]>([]);
  cartTotalAmount$ = new BehaviorSubject<any>({});

  constructor(private apiService: ApiService) {}

  addToCartClick(id: any, qty: number, isAddedFrom?: boolean): Observable<any> {
    let length!: number;

    this.CartItemsLength$.subscribe((res: number) => {
      length = res;
    });

    if (length) {
      this.CartItemsLength$.next(length + 1);
    }

    return this.apiService.addToCart({
      isAddedFromShop: isAddedFrom,
      productId: id,
      quantity: qty,
    });

  }
}
