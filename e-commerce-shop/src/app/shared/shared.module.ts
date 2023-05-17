import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductComponent } from './components/product/product.component';
import { SpecialOfferComponent } from './components/special-offer/special-offer.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingComponent } from './components/rating/rating.component'

@NgModule({
  declarations: [
    ProductComponent,
    SpecialOfferComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule
  ],
  exports : [ProductComponent, SpecialOfferComponent, RatingComponent]
})
export class SharedModule { }
