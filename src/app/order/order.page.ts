import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CardPopoverComponent } from '../card-popover/card-popover.component';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  id: any;
  isNoDelivery = true;
  isNoDone = true;
  subTotal = 0;
  total = 0;
  totalnopromo = 0;
  tax = 0;
  fee = 6000;
  promo = 0;
  name: string;
  img: string;

  username: string;

  bookmenu: any;

  constructor(public popoverCtrl: PopoverController, private storage: Storage, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    this.storage.get('login').then(async (val) => {
      if(val) {
        this.username = val.name;
      }
    });
  }

  ngOnInit() {
    this.loadData();
    setTimeout(() => {
      this.isNoDelivery = false;
    }, 10000);
    setTimeout(async () => {
      this.isNoDone = false;
      const popover = await this.popoverCtrl.create({
        component: CardPopoverComponent,
        componentProps: {
          withTitle: true,
          title: 'Pesanan Sampai!',
          titleColor: '',
          withContent: true,
          content: 'Yuhuuu! pesanan kamu sudah sampai. Kurirmu sedang menunggu didepan.',
          contentSize: 12,
          withButton: true,
          buttonText: 'Oke',
          buttonIsRed: true,
        },
        cssClass: 'popover-helper-style',
        showBackdrop: true,
      });
      await popover.present();
    }, 20000);
  }

  async loadData() {
    await fetch('./assets/data/data-kopi.json').then(res => res.json())
    .then(async json => {
      await json.data.forEach(element => {
        if (element.id === parseInt(this.id)) {
          this.promo = element.promo;
          this.name = element.name;
          this.img = element.img;
        }
      });
    });
    await this.storage.get('order').then((val) => {
      if(val) {
        this.bookmenu = val;
        this.bookmenu.forEach(element => {
          this.subTotal += element.price;
        });
        this.tax = this.subTotal * 0.1;
        this.totalnopromo = this.subTotal + this.tax + this.fee;
        if (this.promo > 0) {
          this.total = (this.subTotal + this.tax + this.fee) - ((this.subTotal + this.tax + this.fee) * this.promo);
        } else {
          this.total = this.subTotal + this.tax + this.fee;
        }
      }
    });
  }

  async doneOrder() {
    const dt = new Date();
    const date = `${
      dt.getFullYear().toString().padStart(4, '0')}-${
      (dt.getMonth()+1).toString().padStart(2, '0')}-${
      dt.getDate().toString().padStart(2, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}:${
      dt.getSeconds().toString().padStart(2, '0')}`;

    const payload = {
      id: this.id,
      date,
      name: this.name,
      img: this.img,
      listmenu: this.bookmenu,
      subTotal: this.subTotal,
      tax: this.tax,
      fee: this.fee,
      total: this.total,
      promo: this.promo,
      totalnopromo: this.totalnopromo,
      trxid: 'TRX' + Math.floor(Math.random() * 100000000000)
    }
    this.storage.get('transaction').then((val) => {
      if(val) {
        const trx = val;
        trx.push(payload);
        this.storage.set('transaction', trx);
      } else {
        this.storage.set('transaction', [payload]);
      }
    });
    this.storage.remove('order');
    const nameuser = this.username.split(' ');
    const popover = await this.popoverCtrl.create({
      component: CardPopoverComponent,
      componentProps: {
        withTitle: true,
        title: 'Terima kasih ',
        name: nameuser[0],
        titleColor: '',
        withContent: true,
        content: 'Have a nice day! Pastikan kopi pesanan kamu dalam keadaan baik ya!',
        contentSize: 12,
        withButton: true,
        buttonText: 'Selesai',
        buttonIsRed: true,
      },
      cssClass: 'popover-helper-style',
      showBackdrop: true,
    });
    await popover.present();
  }

  mappingCurrency(nominal) {
    if (!!nominal || nominal === 0) {
      const num = parseInt(nominal, 10);
      return 'Rp' + num
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        .replace(/\./g, ',')
        .toString();
    }
    return 'Rp0';
  }

}
