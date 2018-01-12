import { Component } from '@angular/core';
import { Platform, App, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { RedditService } from './services/reddit.service';

@Component({
  templateUrl: 'app.html',
  providers: [RedditService]
})
export class MyApp {
  rootPage:any = TabsPage;
  
	allowClose: any;
	lastBack: any;

	constructor(public  app: App, public platform: Platform, public toastCtrl: ToastController, public statusBar: StatusBar, public splashScreen: SplashScreen) {
		
		platform.ready().then((readySource) => {
		  // Okay, so the platform is ready and our plugins are available.
		  // Here you can do any higher level native things you might need.
		  statusBar.overlaysWebView(true);
		  statusBar.backgroundColorByHexString("#488aff");
		  splashScreen.hide();
		  
			let lastTimeBackPress = 0;
			let timePeriodToExit  = 2500;
			
				platform.registerBackButtonAction(() => {
					const overlay = this.app._appRoot._overlayPortal.getActive();
					const nav = this.app.getActiveNav();
					const closeDelay = 2500;
					const spamDelay = 500;

					if(overlay && overlay.dismiss) {
					  overlay.dismiss();
					} else if(nav.canGoBack()) {
					  nav.pop();
					} else if(Date.now() - this.lastBack > spamDelay && !this.allowClose) {
					  this.allowClose = true;
					  let toast = this.toastCtrl.create({
						message: 'Press Again to Exit App.', //this.translate.instant("general.close_toast"),
						duration: closeDelay,
						dismissOnPageChange: true
					  });
					  toast.onDidDismiss(() => {
						this.allowClose = false;
					  });
					  toast.present();
					} else if(Date.now() - this.lastBack < closeDelay && this.allowClose) {
					  this.platform.exitApp();
					}
					this.lastBack = Date.now();
				});

		});
	}
}
