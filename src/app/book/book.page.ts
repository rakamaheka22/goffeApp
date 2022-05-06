import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  id: any;
  subTotal = 0;
  total = 0;
  totalnopromo = 0;
  tax = 0;
  fee = 6000;
  promo = 0;

  bookmenu: any;

  name: any;
  address: any;

  backSub: any;

  constructor(private route: ActivatedRoute, public navCtrl: NavController, private storage: Storage, private platform: Platform, private location: Location) {
    this.id = this.route.snapshot.params['id'];
    this.storage.get('login').then(async (val) => {
      if(val) {
        this.name = val.name;
        this.address = val.address;
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.backSub = this.platform.backButton.subscribe(() => {
      this.location.back();
    });
  }

  ngOnDestroy() {
    this.backSub.unsubscribe();
  }

  async loadData() {
    await fetch('./assets/data/data-kopi.json').then(res => res.json())
    .then(async json => {
      await json.data.forEach(element => {
        if (element.id === parseInt(this.id)) {
          this.promo = element.promo;
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

  goToOrder() {
    this.navCtrl.navigateRoot(['/order', this.id]);
  }

  backToOrder() {
    this.navCtrl.navigateRoot(['/detail-product', this.id]);
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
