import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  id: any;
  subTotal = 0;
  total = 0;
  tax = 0;
  fee = 6000;
  trxid: any;
  promo = 0;
  totalnopromo = 0;

  listmenu: any;

  name: any;
  address: any;

  backSub: any;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private storage: Storage,
    private platform: Platform,
    private location: Location
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.storage.get('transaction').then((val) => {
      if(val) {
        val.forEach(element => {
          if (element.id === this.id) {
            this.listmenu = element.listmenu;
            this.subTotal = element.subTotal;
            this.tax = element.tax;
            this.total = element.total;
            this.trxid = element.trxid;
            this.promo = element.promo;
            this.totalnopromo = element.totalnopromo;
          }
        });
      }
    });
    this.storage.get('login').then(async (val) => {
      if(val) {
        this.name = val.name;
        this.address = val.address;
      }
    });
  }

  ngAfterViewInit() {
    this.backSub = this.platform.backButton.subscribe(() => {
      this.location.back();
    });
  }

  ngOnDestroy() {
    this.backSub.unsubscribe();
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
