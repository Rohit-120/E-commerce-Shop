import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
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
  selectedIndex: any = null;
  currencyInfo: any;
  subscriptions: Subscription[] = [];

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
        this.cartItems = res.data.products;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }

  /**
   * @param index number of the Cart object
   * Increase the Cart Quantity
   */
  increase(index: number) {
    if (this.cartItems[index].quantity < 7) {
      this.cartItems[index].quantity++;
      this.cartItems[index].total =
        this.cartItems[index].product.price * this.cartItems[index].quantity;
    }
    this.getAllTotal();
  }

  /**
   * @param index number of the Cart object
   * Decrease the Cart Quantity
   */
  decrease(index: number) {
    if (this.cartItems[index].quantity > 0) {
      this.cartItems[index].quantity--;
      this.cartItems[index].total =
        this.cartItems[index].product.price * this.cartItems[index].quantity;
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

  removeCart(_id: number) {
    this.apiCall.removeCartProduct({ _cart: _id }).subscribe({
      next: (res) => {
        if (res.type === 'success') {
          this.toastService.show(res.message, 'product removed')
        }
      },
    });
    // this.cartItems.splice(_id, 1);
    // this.commonService.totalCartItems.next(this.cartItems.length);
    // this.getAllTotal();
  }

  getCurrencyInfo() {
    let sub3 = this.commonService.currencyChanges.subscribe({
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
