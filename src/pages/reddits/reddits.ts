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
  constructor(public navCtrl: NavController, private redditService: RedditService) {
    this.getDefaults();
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
      this.limit = '10';
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
