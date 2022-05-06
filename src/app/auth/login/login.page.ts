import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';

import { NavController, PopoverController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CardPopoverComponent } from 'src/app/card-popover/card-popover.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  surel = '';
  katasandi = '';
  showPassword = false;

  isKeyboard = true;

  keyboardHeight = '0';

  form: FormGroup;

  submitAttempt = false;

  constructor(
    private loadingService: LoadingService,
    public navCtrl: NavController,
    private storage: Storage,
    public popoverCtrl: PopoverController,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        surel: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        katasandi: ['', [Validators.required]]
      }
    );
  }

  get errorControl() {
    return this.form.controls;
  }

  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.navCtrl.navigateRoot(['/register']);
  }
  
  async goToHome() {
    this.submitAttempt = true;
    if (this.form.valid) {
      this.storage.get('user').then(async (val) => {
        if(val) {
          val.forEach(async (element, index) => {
            if (element.email === this.form.value.surel && element.password === this.form.value.katasandi) {
              this.loadingService.loadingPresent();
              setTimeout(() => {
                this.navCtrl.navigateRoot(['/tabs/home']);
              }, 2000);
              this.loadingService.loadingDismiss();
              this.storage.set('login', val[index]);
            } else {
              const popover = await this.popoverCtrl.create({
                component: CardPopoverComponent,
                componentProps: {
                  withTitle: true,
                  title: 'Akun Tidak Valid',
                  titleColor: 'danger',
                  withContent: true,
                  content: 'Pastikan email dan kata sandi yang kamu masukkan benar dan valid',
                  contentSize: 12,
                  withButton: true,
                  buttonText: 'Kembali',
                  buttonIsRed: true,
                },
                cssClass: 'popover-helper-style',
                showBackdrop: true,
              });
              await popover.present();
            }
          });
        } else {
          const popover = await this.popoverCtrl.create({
            component: CardPopoverComponent,
            componentProps: {
              withTitle: true,
              title: 'Akun Tidak Valid',
              titleColor: 'danger',
              withContent: true,
              content: 'Pastikan email dan kata sandi yang kamu masukkan benar dan valid',
              contentSize: 12,
              withButton: true,
              buttonText: 'Kembali',
              buttonIsRed: true,
            },
            cssClass: 'popover-helper-style',
            showBackdrop: true,
          });
          await popover.present();
        }
      });
    }
  }

  inputTyping() {
    this.submitAttempt = false;
  }
}
