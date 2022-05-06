import { AboutPopoverComponent } from './about-popover/about-popover.component';
import { LoadingService } from './services/loading.service';
import { CardPopoverComponent } from './card-popover/card-popover.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmPopoverComponent } from './confirm-popover/confirm-popover.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent, CardPopoverComponent, ConfirmPopoverComponent, AboutPopoverComponent],
  entryComponents: [CardPopoverComponent, ConfirmPopoverComponent, AboutPopoverComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
