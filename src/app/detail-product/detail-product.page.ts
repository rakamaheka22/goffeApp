import { ModalOrderComponent } from './modal-order/modal-order.component';
import { ModalRatingComponent } from './modal-rating/modal-rating.component';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, PopoverController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ConfirmPopoverComponent } from '../confirm-popover/confirm-popover.component';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  id: any;

  data: any;
  listmenu: any;
  specialmenu: any;
  bookmenu = [];
  countItem = 0;
  total = 0;
  
  backSub: any;
  

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private route: ActivatedRoute,
    private storage: Storage,
    private platform: Platform) {
      this.backSub = this.platform.backButton.subscribe(async () => {
        if (this.countItem === 0) {
          this.navCtrl.navigateRoot(['/tabs/home']);
        } else {
          const popover = await this.popoverCtrl.create({
            component: ConfirmPopoverComponent,
            componentProps: {
              withTitle: true,
              title: 'Batalkan Pesanan ?',
              titleColor: '',
              withContent: true,
              content: 'Yakin ingin membatalkan pesanan ?',
              contentSize: 12,
              withButton: true,
              buttonTextYes: 'Ya',
              buttonTextNo: 'Tidak',
            },
            cssClass: 'popover-helper-style',
            showBackdrop: true,
          });
          await popover.present();
        }
      });
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    fetch('./assets/data/data-kopi.json').then(res => res.json())
    .then(async json => {
      const randomId = await Math.floor(Math.random() * Math.floor(5));
      await json.data.forEach(element => {
        if (element.id === parseInt(this.id)) {
          this.data = [element];
          this.listmenu = element.list_menu;
        }
      });
      this.specialmenu = [this.listmenu[randomId]];
    });
    setInterval(async () => {
      let countTotal = 0;
      let item = 0;
      await this.storage.get('order').then((val) => {
        if(val) {
          this.bookmenu = val;
          item = this.bookmenu.length;
          this.bookmenu.forEach(element => {
            countTotal += element.price;
          });
        }
      });
      this.countItem = item;
      this.total = countTotal;
    }, 1000);
  }

  ngOnDestroy() {
    this.backSub.unsubscribe();
  }

  async showRating(name) {
    const presentModel = await this.modalCtrl.create({
      component: ModalRatingComponent,
      componentProps: {
        title: name,
        buttonText: 'Beri Rating'
      },
      showBackdrop: true,
      mode:	"ios",
      cssClass: 'change-rating-modal'
    });
    await presentModel.present();
  }

  async goToDetail(data) {
    const presentModel = await this.modalCtrl.create({
      component: ModalOrderComponent,
      componentProps: {
        title: data.name,
        img: data.img,
        desc: data.desc,
        price: data.price,
        buttonText: 'Masukkan ke Pesanan',
      },
      showBackdrop: true,
      mode:	"ios",
      cssClass: 'change-order-modal'
    });
    await presentModel.present();
  }

  goToBook() {
    this.navCtrl.navigateRoot(['/book', this.id]);
  }

  async cancelBook() {
    if (this.countItem === 0) {
      this.navCtrl.navigateRoot(['/tabs/home']);
    } else {
      const popover = await this.popoverCtrl.create({
        component: ConfirmPopoverComponent,
        componentProps: {
          withTitle: true,
          title: 'Batalkan Pesanan ?',
          titleColor: '',
          withContent: true,
          content: 'Yakin ingin membatalkan pesanan ?',
          contentSize: 12,
          withButton: true,
          buttonTextYes: 'Ya',
          buttonTextNo: 'Tidak',
        },
        cssClass: 'popover-helper-style',
        showBackdrop: true,
      });
      await popover.present();
    }
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
