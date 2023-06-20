import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layout/full/full.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { FavoriteComponent } from '../shared/components/favorite/favorite.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      // {
      //   path: 'cart',
      //   component: CartComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate : [AuthGuard],
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'favorite',
        component: FavoriteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('../main/shop/shop.module').then((m) => m.ShopModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path : 'cart',
        loadChildren : () => import('../main/cart/cart.module').then((m) => m.CartModule),
        canActivate : [AuthGuard],
      }
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
