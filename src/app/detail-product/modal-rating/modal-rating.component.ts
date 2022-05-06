import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CardPopoverComponent } from 'src/app/card-popover/card-popover.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.component.html',
  styleUrls: ['./modal-rating.component.scss'],
})
export class ModalRatingComponent {

  @Input() title: string;
  @Input() buttonText: string;

  rate: any;

  username: string;

  constructor(private modalCtrl: ModalController, public popoverCtrl: PopoverController, private storage: Storage) {
    this.storage.get('login').then(async (val) => {
      if(val) {
        this.username = val.name;
      }
    });
  }

  async closeModal() {
    this.modalCtrl.dismiss();
    const nameuser = this.username.split(' ');
    const popover = await this.popoverCtrl.create({
      component: CardPopoverComponent,
      componentProps: {
        withTitle: true,
        title: 'Terimakasih ',
        name: nameuser[0],
        titleColor: '',
        withContent: true,
        content: `Atas pemberian rating-mu ke ${this.title}`,
        contentSize: 12,
        withButton: true,
        buttonText: 'Oke',
        buttonIsRed: true,
      },
      cssClass: 'popover-helper-style',
      showBackdrop: true,
    });
    await popover.present();
  }

  changeRating(event) {
    console.log(event);
  }

}
