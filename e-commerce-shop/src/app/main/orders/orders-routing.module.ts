import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { MyOrderDetailsComponent } from './my-order-details/my-order-details.component';

const routes: Routes = [
  
  {
    path: '',
    component: MyOrdersComponent,
  },
  {
    path: 'order-details/:orderId',
    component: MyOrderDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
