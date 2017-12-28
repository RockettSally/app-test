import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
  item: any;
  constructor(public navCtrl: NavController, platform: Platform ,public params: NavParams) {
    this.item = params.get('item');

      let backAction =  platform.registerBackButtonAction(() => {
        console.log("second");
        this.navCtrl.pop();
        backAction();
      },2);

  }

}
