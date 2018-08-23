import { Component, OnInit } from '@angular/core';
import { Events, LoadingController } from 'ionic-angular';
import { EditArticlePageComponent } from '../edit-article-page/edit-article-page.component';
import { CreateArticlePageComponent } from '../create-article-page/create-article-page.component';
import { ArticlesService } from '../../articles.service';
import { UtilService } from '../../../shared/service/util.service';
import { AppPublishEvents } from '../../../app.enum';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {
  articles: any;

  constructor(
    private utilService: UtilService,
    private articlesService: ArticlesService,
    private loadingCtrl: LoadingController,
    private events: Events
  ) { 
    this.events.subscribe(AppPublishEvents.APP_RELOAD_ARTICLES, () => {
      this.initPage();
    })
  }

  ngOnInit() {
    this.initPage();
  }

  initPage() {
    this.articlesService.getArticlesCache().subscribe(resp => {
      this.articles = resp;
    });
  }

  onViewArticle(_article){
    console.log('[onViewArticle]: ', event);
    this.utilService.openPage(EditArticlePageComponent, true, {article: _article});
  }

  onPlusTapped() {
    this.utilService.openPage(CreateArticlePageComponent, true, {})
  }

}
