import { ModalOrderComponent } from './modal-order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ModalOrderComponent],
  entryComponents: [ModalOrderComponent],
  exports: [ModalOrderComponent],
})
export class ModalOrderComponentModule {}
