import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  CartItems: any[] = [];
  quantity: number = 1;
  perProductTotal!: number;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private apiCall: ApiService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb.next([
      {
        label: 'Home',
        url : '/',
      },
      {
        label: 'Shop',
        url : 'shop',
      },
      {
        label: 'Shopping  Cart  ',
        url : 'shopping-cart',
      }
   ])

   this.getCartDetails()

  }

  //To get Cart Item details using ApiService
  getCartDetails(){
    this.apiCall.getCartItems().subscribe({
      next : (res:any) => {
        console.log(res);
        
        for (const product of res.products) {
          this.apiCall.getSingleProduct(product.productId).subscribe({
            next : (result : any) => {
              
              this.CartItems.push(result)
              console.log(this.CartItems, 'ddddddddddddddddddddddddddd');
              
            }
          })
          
        } 
        
      }
    })
  }

  //Increase the Cart Quantity
  decrease(productDetail : any, index : number){

    console.log(index, 'indexNumber');
    console.log(productDetail.index);
    
    if (this.quantity > 0) {
      this.quantity--;
      this.perProductTotal = productDetail[index] * this.quantity;

    }
    
  }

  //Decrease the Cart Quantity
  increase(productDetail : any, index : number){
    
    if (this.quantity < 7) {
      this.quantity++
      this.perProductTotal = productDetail[index]?.price * this.quantity;
    }
  }

}
