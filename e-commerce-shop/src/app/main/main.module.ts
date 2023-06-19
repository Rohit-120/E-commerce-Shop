import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { FeaturedProductComponent } from 'src/main/components/featured-product/featured-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../shared/interceptors/token.interceptor';
import { VendorComponent } from 'src/main/components/vendor/vendor.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    CategoriesComponent,
    VendorComponent,
    ShopDetailComponent,
    FeaturedProductComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule,
    DragScrollModule,
    MainRoutingModule,
    NgxPaginationModule,
  ],
  providers : [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    }

  ]
})
export class MainModule { }
