import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArticlesPageComponent } from '../articles/containers/articles-page/articles-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle: string = 'Daily Digest';
  pageRoot: any = ArticlesPageComponent;

  constructor(
    public nav: NavController
  ) { }

  ngOnInit() {
  }

  

}
