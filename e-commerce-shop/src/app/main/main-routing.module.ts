import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layout/full/full.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { FavoriteComponent } from '../shared/components/favorite/favorite.component';
import { AuthGuard } from '../shared/guards/auth.guard';

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
      {
        path: 'checkout',
        component: CheckoutComponent,
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
        path: 'cart',
        loadChildren: () =>
          import('../main/cart/cart.module').then((m) => m.CartModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'my-orders',
        loadChildren: () =>
          import('../main/orders/orders.module').then((m) => m.OrdersModule),
        canActivate: [AuthGuard],
      },
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
