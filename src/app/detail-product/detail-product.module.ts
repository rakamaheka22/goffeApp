import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProductPageRoutingModule } from './detail-product-routing.module';

import { DetailProductPage } from './detail-product.page';
import { ModalOrderComponentModule } from './modal-order/modal-order.module';
import { ModalRatingComponentModule } from './modal-rating/modal-rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProductPageRoutingModule,
    ModalRatingComponentModule,
    ModalOrderComponentModule
  ],
  declarations: [DetailProductPage]
})
export class DetailProductPageModule {}
