import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, Platform } from '@ionic/angular';
import { CardPopoverComponent } from 'src/app/card-popover/card-popover.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showPassword = false;
  reshowPassword = false;

  passwordNotMatch = false;

  submitAttempt = false;

  form: FormGroup;

  backSub: any;

  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    private platform: Platform,
    private location: Location,
    private storage: Storage,
    private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        nama: ['', [Validators.required]],
        surel: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        katasandi: ['', [Validators.required]],
        katasandiulang: ['', [Validators.required]],
        notlp: ['', [Validators.required]],
        alamat: ['', [Validators.required]],
      }
    );
  }

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

  get errorControl() {
    return this.form.controls;
  }

  onPasswordToggle(type) {
    if (type === '1') {
      this.showPassword = !this.showPassword;
    } else {
      this.reshowPassword = !this.reshowPassword;
    }
  }

  async goToLogin() {
    this.submitAttempt = true;
    
    if (this.form.valid) {
      const payload = {
        id: Math.floor(Math.random() * 1000),
        email: this.form.value.surel,
        password: this.form.value.katasandi,
        name: this.form.value.nama,
        phone: this.form.value.notlp,
        address: this.form.value.alamat,
      };

      this.storage.get('user').then((val) => {
        if(val) {
          const user = val;
          user.push(payload);
          this.storage.set('user', user);
        } else {
          this.storage.set('user', [payload]);
        }
      });

      const popover = await this.popoverCtrl.create({
        component: CardPopoverComponent,
        componentProps: {
          withTitle: true,
          title: 'Registrasi Berhasil !',
          titleColor: '',
          withContent: true,
          content: 'Akun yang kamu buat sudah teregistrasi. Silahkan masuk ke halaman login untuk melanjutkan',
          contentSize: 12,
          withButton: true,
          buttonText: 'Lanjutkan',
          buttonIsRed: true,
        },
        cssClass: 'popover-helper-style',
        showBackdrop: true,
      });
      await popover.present();
      this.navCtrl.navigateRoot(['/login']);
    }
  }

  inputTyping() {
    this.submitAttempt = false;
  }

  inputPassword(data) {
    this.submitAttempt = false;
    if(data.target.value === this.form.value.katasandi) {
      this.passwordNotMatch = false;
    } else {
      this.passwordNotMatch = true;
    }
  }

}
