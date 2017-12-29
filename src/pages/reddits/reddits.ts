import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {
  items: any;
  category: any;
  limit: any;
  selectLimit: any;
  selectCategory: any;

  constructor(public navCtrl: NavController, private redditService: RedditService) {
    this.getDefaults();

    this.selectCategory = {
      title: 'Category',
      subTitle: 'Select the category to show',
      mode: 'ios'
    }

    this.selectLimit = {
      title: 'Post Limit',
      subTitle: 'Select the amount of post to be shown',
      mode: 'ios'
    }

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.category = localStorage.getItem('category');
    this.limit = localStorage.getItem('limit');

    this.getPosts(this.category,this.limit);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ngOnInit(){
    this.getPosts(this.category,this.limit);
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
      this.limit = '5';
    }
  }

  setDefaults(){
    localStorage.setItem('category',this.category);
    localStorage.setItem('limit',this.limit);
  }

  getPosts(category, limit){
    this.redditService.getPosts(category, limit).subscribe(response => {
      this.items = response.data.children;
    });
  }

  viewItem(item){
    this.navCtrl.push(DetailsPage, {
      item:item
    });
  }

  changeSelects(){
    this.setDefaults();
    this.getPosts(this.category,this.limit);
  }

  ionSelected(){
    this.category = localStorage.getItem('category');
    this.limit = localStorage.getItem('limit');

    this.getPosts(this.category,this.limit);
  }

  ionChange(){
    this.category = localStorage.getItem('category');
    this.limit = localStorage.getItem('limit');

    this.getPosts(this.category,this.limit);
  }

}
