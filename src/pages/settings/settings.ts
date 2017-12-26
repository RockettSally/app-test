import { Component } from '@angular/core';
import { NavController, Tabs, ToastController } from 'ionic-angular';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  category: any;
  limit: any;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
    this.getDefaults();
  }

  selectTab(index: number){
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
    this.getDefaults();
  }

  getDefaults(){
    if(localStorage.getItem('category') != null){
      this.category = localStorage.getItem('category');
    } else {
      this.category = 'gaming';
    }

    if(localStorage.getItem('limit') != null){
      this.limit = localStorage.getItem('limit');
    } else {
      this.limit = '10';
    }
  }

  setDefaults(){
    localStorage.setItem('category',this.category);
    localStorage.setItem('limit',this.limit);
    this.toast('Settings Saved Successfully!');
  }

  toast(text: String) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
