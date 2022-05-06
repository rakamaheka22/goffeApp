import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

/**
 * Popover component
 *
 * @export
 * @class ConfirmPopoverComponent
 */
@Component({
  selector: 'mp-confirm-popover',
  templateUrl: './confirm-popover.component.html',
  styleUrls: ['./confirm-popover.component.scss']
})
export class ConfirmPopoverComponent {
  @Input() icon: string;
  @Input() iconColor: string;
  @Input() iconSize: number;
  @Input() withTitle: boolean;
  @Input() title: string;
  @Input() titleColor: string;
  @Input() withContent: boolean;
  @Input() content: string;
  @Input() contentSize: number;
  @Input() contentColor: string;
  @Input() withButton: boolean;
  @Input() buttonTextYes: string;
  @Input() buttonTextNo: string;
  @Input() buttonIsRed: boolean;

  /**
   *Creates an instance of ConfirmPopoverComponent.
   * @param {PopoverController} popoverCtrl
   * @memberof ConfirmPopoverComponent
   */
  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private storage: Storage
    ) { }

  /**
   * Close popover
   *
   * @memberof ConfirmPopoverComponent
   */
  closePopover(value) {
    this.popoverCtrl.dismiss();
    if (value === 'Keluar') {
    this.storage.remove('login');
      this.router.navigate([ '/login' ]);
    }
    if (value === 'Ya') {
      this.storage.remove('order');
      this.router.navigate([ '/tabs/home' ]);
    }
  }
}
