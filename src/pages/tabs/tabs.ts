import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { RedditsPage } from '../reddits/reddits';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  items: any;
  category: any;
  limit: any;

  tab1Root = RedditsPage;
  tab2Root = AboutPage;

  constructor() {

  }

}
