import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layout/full/full.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path : '',
    component : FullComponent,
    children : [
      {
        path : '',
        redirectTo : 'dashboard',
        pathMatch : 'full'
      },
      {
        path : 'dashboard',
        component : DashboardComponent
      },
      {
        path : 'shop',
        component : ShopComponent
      },
      {
        path : 'shop-detail/:id',
        component : ProductDetailComponent
      },
      {
        path : 'cart', 
        component : CartComponent
      },
      {
        path : 'checkout',
        component : CheckoutComponent
      },
      {
        path : 'contact',
        component : ContactComponent
      },
     
    ]
  },
  {
    path : '**',
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
