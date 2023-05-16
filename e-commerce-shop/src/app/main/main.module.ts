import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShopComponent } from './shop/shop.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorComponent } from '../root-components/vendor/vendor.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DragScrollModule } from 'ngx-drag-scroll';


@NgModule({
  declarations: [
    DashboardComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    ProductDetailComponent,
    ShopComponent,
    CategoriesComponent,
    VendorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule,
    DragScrollModule,
    MainRoutingModule
  ]
})
export class MainModule { }
