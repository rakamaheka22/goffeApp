import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFilterComponent } from './modal-filter.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ModalFilterComponent],
  entryComponents: [ModalFilterComponent],
  exports: [ModalFilterComponent],
})
export class ModalFilterComponentModule {}
