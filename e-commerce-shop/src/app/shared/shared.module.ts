import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductComponent } from './components/product/product.component';
import { SpecialOfferComponent } from './components/special-offer/special-offer.component';


@NgModule({
  declarations: [
    ProductComponent,
    SpecialOfferComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports : [ProductComponent, SpecialOfferComponent]
})
export class SharedModule { }
