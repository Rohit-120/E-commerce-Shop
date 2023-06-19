import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ImagePipe } from 'src/app/shared/pipes/image.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    DragScrollModule,
    NgxPaginationModule,
    SharedModule

  ],
  providers : [
    ImagePipe
  ]
})
export class ShopModule { }
