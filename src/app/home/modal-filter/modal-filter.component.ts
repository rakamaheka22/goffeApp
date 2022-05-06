import { LoadingService } from './../../services/loading.service';
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent {
  @Input() title: string;
  @Input() buttonText: string;

  rating: number;

  constructor(private modalCtrl: ModalController, private loadingService: LoadingService) { }

  closeModal() {
    this.modalCtrl.dismiss();
    this.loadingService.loadingPresent();
    setTimeout(() => {
      this.loadingService.loadingDismiss();
    }, 3000);
  }

  changeRating(event) {
    console.log(event);
  }

}
