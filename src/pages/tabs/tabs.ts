import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { RedditsPage } from '../reddits/reddits';
import { SettingsPage } from '../settings/settings';

import { RedditService } from '../../app/services/reddit.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  items: any;
  category: any;
  limit: any;

  tab1Root = RedditsPage;
  tab2Root = SettingsPage;
  tab3Root = AboutPage;

  constructor(private redditService: RedditService) {

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

}
