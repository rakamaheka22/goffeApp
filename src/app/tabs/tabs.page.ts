import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  coffeIcon = './assets/icons/md-coffee-active.png';
  clickedCoffeIcon = './assets/icons/md-coffee.png';
  homeIcon = './assets/icons/md-home-active.png';
  clickedHomeIcon = './assets/icons/md-home.png';

  isCoffeSelected = false;
  isHomeSelected = false;

  constructor(private router: Router) {
    if (this.router.url === '/tabs/home') {
      this.isCoffeSelected = true;
    } else {
      this.isCoffeSelected = false;
    }

    if (this.router.url === '/tabs/profile') {
      this.isHomeSelected = true;
    } else {
      this.isHomeSelected = false;
    }
  }

  changeCoffeIcon(): void {    
    this.resetAll();
    this.isCoffeSelected = true;
  }

  changeHomeIcon(): void {
   this.resetAll();
   this.isHomeSelected = true;
  }

  resetAll(){
    this.isCoffeSelected = false;
    this.isHomeSelected= false;
  }
}
