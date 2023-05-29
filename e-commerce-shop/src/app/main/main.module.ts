import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { VendorComponent } from '../vendor/vendor.component';
import { FeaturedProductComponent } from 'src/main/components/featured-product/featured-product.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DashboardComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    ShopComponent,
    CategoriesComponent,
    VendorComponent,
    ShopDetailComponent,
    FeaturedProductComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule,
    DragScrollModule,
    MainRoutingModule,
    NgxPaginationModule
  ]
})
export class MainModule { }
