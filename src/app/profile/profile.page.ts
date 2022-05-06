import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  transaction: any;
  name: any;
  email: any;
  phone: any;
  address: any;

  constructor(public navCtrl: NavController, private storage: Storage, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.loadData();
    }, 500);
  }

  loadData() {
    this.storage.get('transaction').then((val) => {
      if(val) {
        this.transaction = val;
        this.transaction.reverse();
      }
    });
    this.storage.get('login').then(async (val) => {
      if(val) {
        this.name = val.name;
        this.email = val.email;
        this.phone = val.phone;
        this.address = val.address;
      }
    });
  }

  goToDetail(id) {
    this.router.navigate(['/transaction', id]);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }

}
