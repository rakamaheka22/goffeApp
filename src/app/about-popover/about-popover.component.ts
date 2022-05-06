import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, IonSegmentButton } from '@ionic/angular';

/**
 * Popover component
 *
 * @export
 * @class AboutPopoverComponent
 */
@Component({
  selector: 'mp-about-popover',
  templateUrl: './about-popover.component.html',
  styleUrls: ['./about-popover.component.scss']
})
export class AboutPopoverComponent {
  /**
   *Creates an instance of AboutPopoverComponent.
   * @param {PopoverController} popoverCtrl
   * @memberof AboutPopoverComponent
   */
  constructor(
    private popoverCtrl: PopoverController) { }

  /**
   * Close popover
   *
   * @memberof AboutPopoverComponent
   */
  closePopover() {
    this.popoverCtrl.dismiss();
  }
}
