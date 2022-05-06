import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, Platform } from '@ionic/angular';
import { CardPopoverComponent } from '../card-popover/card-popover.component';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  id: any;
  name: any;
  email: any;
  password: any;
  phone: any;
  address: any

  backSub: any;

  constructor(public navCtrl: NavController,
    private router: Router,
    private storage: Storage,
    public popoverCtrl: PopoverController, private platform: Platform, private location: Location) {}

  ngOnInit() {
    this.storage.get('login').then(async (val) => {
      if(val) {
        this.id = val.id;
        this.name = val.name;
        this.email = val.email;
        this.password = val.password;
        this.phone = val.phone;
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

  async saveSetting() {
    const payload = {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      phone: this.phone,
      address: this.address,
    };
    this.storage.get('user').then((val) => {
      if(val) {
        const user = val;
        user.forEach((element, index) => {
          if (element.id === this.id) {
            user.splice(index, 1);
          }
        });
        user.push(payload);
        this.storage.set('user', user);
      } else {
        this.storage.set('user', [payload]);
      }
    });
    this.storage.set('login', payload);
    const popover = await this.popoverCtrl.create({
      component: CardPopoverComponent,
      componentProps: {
        withTitle: true,
        title: 'Perubahan Tersimpan',
        titleColor: '',
        withContent: true,
        content: 'Perubahan data profil kamu berhasil tersimpan. Silahkan kembali ke halaman profil',
        contentSize: 12,
        withButton: true,
        buttonText: 'Ke Halaman Profil',
        buttonIsRed: true,
      },
      cssClass: 'popover-helper-style',
      showBackdrop: true,
    });
    await popover.present();
  }

  backButton() {
    this.router.navigate([ '/tabs/profile' ]);
  }


}
