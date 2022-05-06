import { Router } from '@angular/router';
import { AboutPopoverComponent } from './../about-popover/about-popover.component';
import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, Platform } from '@ionic/angular';
import { ConfirmPopoverComponent } from '../confirm-popover/confirm-popover.component';
import { Location } from "@angular/common";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  backSub: any;

  constructor(public navCtrl: NavController,
    private router: Router,
    public popoverCtrl: PopoverController, private platform: Platform, private location: Location) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.backSub = this.platform.backButton.subscribe(() => {
      this.location.back();
    });
  }

  ngOnDestroy() {
    this.backSub.unsubscribe();
  }

  async goToLogin() {
    const popover = await this.popoverCtrl.create({
      component: ConfirmPopoverComponent,
      componentProps: {
        withTitle: true,
        title: 'Ingin Keluar ?',
        titleColor: '',
        withContent: true,
        content: 'Apa kamu yakin ingin keluar ?',
        contentSize: 12,
        withButton: true,
        buttonTextYes: 'Keluar',
        buttonTextNo: 'Batal',
      },
      cssClass: 'popover-helper-style',
      showBackdrop: true,
    });
    await popover.present();
  }

  async aboutApp() {
    const popover = await this.popoverCtrl.create({
      component: AboutPopoverComponent,
      cssClass: 'popover-helper-style',
      showBackdrop: true,
    });
    await popover.present();
  }

  backButton() {
    this.router.navigate([ '/tabs/profile' ]);
  }

}
