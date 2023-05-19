import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductComponent } from './components/product/product.component';
import { SpecialOfferComponent } from './components/special-offer/special-offer.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingComponent } from './components/rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteComponent } from './components/favorite/favorite.component';

@NgModule({
  declarations: [
    ProductComponent,
    SpecialOfferComponent,
    RatingComponent,
    FavoriteComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [ProductComponent, SpecialOfferComponent, RatingComponent, ReactiveFormsModule, FavoriteComponent]
})
export class SharedModule { }
