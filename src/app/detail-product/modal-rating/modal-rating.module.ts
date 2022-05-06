import { ModalRatingComponent } from './modal-rating.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, IonicRatingModule],
  declarations: [ModalRatingComponent],
  entryComponents: [ModalRatingComponent],
  exports: [ModalRatingComponent],
})
export class ModalRatingComponentModule {}
