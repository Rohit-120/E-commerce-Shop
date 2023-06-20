import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  quantity: number = 1;
  subTotal: number = 0;
  shipping: number = 10;
  currencyInfo: any;
  subscriptions: Subscription[] = [];
  body: any = {
    productId: '',
    quantity: null,
  };

  constructor(
    private breadcrumbService: BreadcrumbService,
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Shop',
        url: 'shop',
      },
      {
        label: 'Shopping  Cart  ',
        url: 'shopping-cart',
      },
    ]);

    this.getCartDetails();
    this.getCurrencyInfo();
  }

  //To get Cart Item details using ApiService
  getCartDetails() {
    let sub1 = this.apiCall.getCartProducts().subscribe({
      next: (res: any) => {
        if (res.type === 'success') {
          this.cartItems = res.data.products;
          this.commonService.CartItemsLength$.next(this.cartItems.length);
          this.commonService.totalCartItems$.next(res.data.products);
          this.getAllTotal();
          this.commonService.cartTotalAmount$.next({
            total: this.subTotal,
            shipping: this.shipping,
          });
          this.cdr.markForCheck();
        } else {
          this.toastService.error('', res.message);
        }
      },
    });
    this.subscriptions.push(sub1);
  }

  changeQuantity() {
    this.apiCall.changeCartQuantity(this.body).subscribe({
      next: (res: any) => {
        console.log('Attempting to change ====>', res);
      },
    });
  }

  /**
   * @param index number of the Cart object
   * Increase the Cart Quantity
   */
  increase(index: number, id: any) {
    this.body.quantity = ++this.cartItems[index].quantity;
    this.body.productId = id;
    this.cartItems[index].total =
      this.cartItems[index].product.price * this.cartItems[index].quantity;
    this.changeQuantity();
    this.getAllTotal();
  }

  /**
   * @param index number of the Cart object
   * Decrease the Cart Quantity
   */
  decrease(index: number, id: any) {
    if (this.cartItems[index].quantity > 1) {
      this.body.quantity = --this.cartItems[index].quantity;
      this.body.productId = id;
      this.cartItems[index].total =
        this.cartItems[index].product.price * this.cartItems[index].quantity;
      this.changeQuantity();
    }
    this.getAllTotal();
  }

  // to get the total price
  getAllTotal() {
    let tempTotal: number = 0;

    for (const item of this.cartItems) {
      tempTotal += item.total;
    }
    this.subTotal = tempTotal;

    this.subTotal <= 0 ? (this.shipping = 0) : (this.shipping = 10);
  }

  /**
   * function to remove the particular cart product
   * @param _id unique id of the cart product.
   * @param index index of the cart product.
   */
  removeCart(_id: number, index: number) {
    let removeItemTitle = this.cartItems[index].product.title;
    this.apiCall.removeCartProduct(_id).subscribe({
      next: (res) => {
        if (res.type === 'success') {
          this.cartItems.splice(index, 1);
          this.commonService.CartItemsLength$.next(this.cartItems.length);
          this.getAllTotal();
          this.toastService.show(res.message, `${removeItemTitle}`);
          this.cdr.markForCheck();
        }
      },
    });
  }

  //to get different currency of products
  getCurrencyInfo() {
    let sub3 = this.commonService.currencyChanges$.subscribe({
      next: (res) => {
        this.currencyInfo = res;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub3);
  }

  //Unsubscribe all subscriber on component Destroy
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
