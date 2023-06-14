import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layout/full/full.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { FavoriteComponent } from '../shared/components/favorite/favorite.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';

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
        path : 'shop/:category',
        component : ShopComponent
      },
      {
        path : 'shop-detail',
        component : ShopDetailComponent
      },
      {
        path : 'shop-detail/:id',
        component : ShopDetailComponent
      },
      {
        path : 'cart', 
        component : CartComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'checkout',
        component : CheckoutComponent
      },
      {
        path : 'my-orders',
        component : MyOrdersComponent
      },
      {
        path : 'contact',
        component : ContactComponent
      },
      {
        path : 'favorite',
        component : FavoriteComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'auth',
        loadChildren : () => import('../auth/auth.module').then(m => m.AuthModule)
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
