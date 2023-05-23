import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  CartItems: any[] = [];
  quantity: number = 1;
  subTotal: number = 0;
  shipping: number = 10;
  selectedIndex: any = null;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private apiCall: ApiService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService
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
  }

  //To get Cart Item details using ApiService
  getCartDetails() {
    this.apiCall.getCartItems().subscribe({
      next: (res: any) => {
        for (const product of res.products) {
          this.apiCall.getSingleProduct(product.productId).subscribe({
            next: (result: any) => {
              result['quantity'] = product.quantity;
              result['total'] = this.subTotal =
              parseInt(result.price) * parseInt(result.quantity);
              this.CartItems.push(result);
              this.commonService.totalCartItems.next(this.CartItems.length);
              this.getAllTotal();
              this.cdr.markForCheck();
            },
          });
        }
      },
    });
  }

  /**
   * @param index number of the Cart object
   * Increase the Cart Quantity
   */
  increase(index: number) {
    if (this.CartItems[index].quantity < 7) {
      this.CartItems[index].quantity++;
      this.CartItems[index].total =
        this.CartItems[index].price * this.CartItems[index].quantity;
    }
    this.getAllTotal();
  }

  /**
   * @param index number of the Cart object
   * Decrease the Cart Quantity
   */
  decrease(index: number) {
    if (this.CartItems[index].quantity > 0) {
      this.CartItems[index].quantity--;
      this.CartItems[index].total =
        this.CartItems[index].price * this.CartItems[index].quantity;
    }
    this.getAllTotal();
  }

  // to get the total price
  getAllTotal() {
    let tempTotal: number = 0;

    for (const item of this.CartItems) {
      tempTotal += item.total;
    }
    this.subTotal = tempTotal;

    this.subTotal <= 0 ? (this.shipping = 0) : (this.shipping = 10);
  }

  removeCart(index: number) {
    this.CartItems.splice(index, 1);
    this.commonService.totalCartItems.next(this.CartItems.length);
    this.getAllTotal();
  }
}
