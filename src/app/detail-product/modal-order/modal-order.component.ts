import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.scss'],
})
export class ModalOrderComponent {

  @Input() title: string;
  @Input() img: string;
  @Input() desc: string;
  @Input() price: number;
  @Input() buttonText: string;

  counter = 1;
  notes = '';

  constructor(private modalCtrl: ModalController, private storage: Storage) {
    this.storage.get('order').then((val) => {
      if(val) {
        const listorder = val;
        listorder.forEach((element) => {
          if (element.name === this.title) {
            this.counter = element.count;
            this.notes = element.note;
          }
        });
      }
    });
  }

  async closeModal() {
    const totalPrice = this.price * this.counter;
    const order = {
      name: this.title,
      note: this.notes,
      price: totalPrice,
      count: this.counter
    };
    await this.storage.get('order').then((val) => {
      if(val) {
        const listorder = val;
        listorder.forEach((element, index) => {
          if (element.name === this.title) {
            listorder.splice(index, 1);
          }
        });
        if (this.counter > 0) {
          listorder.push(order);
        }
        this.storage.set('order', listorder);
      } else {
        if (this.counter > 0) {
          this.storage.set('order', [order]);
        }
      }
    });
    this.modalCtrl.dismiss();
  }

  counting(type) {
    if (type === 'minus') {
      if (this.counter !== 0) {
        this.counter -= 1;
      }
    } else {
      this.counter += 1;
    }
  }

}
