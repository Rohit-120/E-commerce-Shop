import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ImagePipe } from 'src/app/shared/pipes/image.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShopComponent,
    ShopDetailComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    DragScrollModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule,

  ],
  providers : [
    ImagePipe
  ]
})
export class ShopModule { }
