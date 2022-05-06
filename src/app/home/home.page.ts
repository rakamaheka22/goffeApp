import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { ModalFilterComponent } from './modal-filter/modal-filter.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  search = '';
  data: any;
  transaction: any;
  isDataNull = true;
  warningSearch = false;

  backSub: any;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private storage: Storage, private platform: Platform) {
    this.backSub = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.backSub.unsubscribe();
  }

  loadData() {
    fetch('./assets/data/data-kopi.json').then(res => res.json())
    .then(json => {
      this.data = json.data;
      this.isDataNull = false;
    });
    this.storage.get('transaction').then((val) => {
      if(val) {
        let trx = [];
        val.forEach(element => {
          trx.push({id: element.id, name: element.name});
        });
        this.transaction = this.removeDuplicates(trx, 'name');
        this.transaction.reverse();
      }
    });
  }

  async filter(){
    const presentModel = await this.modalCtrl.create({
      component: ModalFilterComponent,
      componentProps: {
        title: 'Filter',
        buttonText: 'Terapkan'
      },
      showBackdrop: true,
      mode:	"ios",
      cssClass: 'change-filter-modal'
    });
    await presentModel.present();
  }

  goToDetail(id) {
    this.navCtrl.navigateRoot(['/detail-product', id]);
  }

  randomValue(id) {
    let type = 'secondary';
    if (id % 2 === 0) {
      type = 'primary';
    }
    return type;
  }

  removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject  = {};

    for(const i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(const i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
  };

  searchCoffee(event){
    console.log(event);
    let val = event.target.value;
    if (val.length > 0) {
      this.data = this.data.filter(item => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
      if (this.data.length === 0) {
        this.isDataNull = true;
        this.warningSearch = true;
      } else {
        this.warningSearch = false;
        this.isDataNull = false;
      }
    } else {
      this.warningSearch = false;
      this.isDataNull = false;
      this.loadData();
    }
  }

}
