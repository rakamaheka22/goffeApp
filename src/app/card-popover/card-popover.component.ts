import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, IonSegmentButton } from '@ionic/angular';

/**
 * Popover component
 *
 * @export
 * @class CardPopoverComponent
 */
@Component({
  selector: 'mp-card-popover',
  templateUrl: './card-popover.component.html',
  styleUrls: ['./card-popover.component.scss']
})
export class CardPopoverComponent {
  @Input() icon: string;
  @Input() iconColor: string;
  @Input() iconSize: number;
  @Input() withTitle: boolean;
  @Input() title: string;
  @Input() titleColor: string;
  @Input() name: string;
  @Input() withContent: boolean;
  @Input() content: string;
  @Input() contentSize: number;
  @Input() contentColor: string;
  @Input() withButton: boolean;
  @Input() buttonText: string;
  @Input() buttonIsRed: boolean;

  /**
   *Creates an instance of CardPopoverComponent.
   * @param {PopoverController} popoverCtrl
   * @memberof CardPopoverComponent
   */
  constructor(
    private popoverCtrl: PopoverController,
    private router: Router
    ) { }

  /**
   * Close popover
   *
   * @memberof CardPopoverComponent
   */
  closePopover() {
    this.popoverCtrl.dismiss();
    if (this.buttonText === 'Ke Halaman Profil') {
      this.router.navigate([ '/tabs/profile' ]);
    }
    if (this.buttonText === 'Selesai') {
      this.router.navigate([ '/tabs/home' ]);
    }
  }
}
