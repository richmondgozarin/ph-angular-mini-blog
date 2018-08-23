import { Component, OnInit } from '@angular/core';
import { NavParams, Events } from 'ionic-angular';

import { UtilService } from '../../../shared/service/util.service';
import { ArticlesService } from '../../articles.service';
import { ArticlesI } from '../../articles.interface';
import { AppPublishEvents } from '../../../app.enum';

@Component({
  selector: 'app-edit-article-page',
  template:  `
  <app-articles-form
    [formMode]="'EDIT'"
    [article]="article"
    (saveArticle)="onSaveArticle($event)"
    (deleteArticle)="onDeleteArticle($event)"
    (cancelArticle)="onCancel()">
  </app-articles-form>` 
})
export class EditArticlePageComponent implements OnInit {
  article: ArticlesI;

  constructor(
    private utilService: UtilService,
    private articlesService: ArticlesService,
    private navParams: NavParams,
    private events: Events
  ) { }

  ngOnInit() {
    this.article = this.navParams.get('article') || <ArticlesI>{}; 
  }

  /**
   * Save article data
   * @param articleFormData 
   */
  onSaveArticle(articleFormData: any) {
    
    // Assign the rest of articleFormData object properties to article object
    Object.keys(articleFormData)
          .filter(key => key in this.article)
          .forEach(key => this.article[key] = articleFormData[key]);

    console.log('[onSaveArticle_EDIT]:', this.article);
    
    this.articlesService.updateArticleApi(this.article).subscribe(() => {
      this.utilService.popPage();
    });

    // this.store
		// 	.dispatch(new activitiesActions.SaveActivity(this.activity))
		// 	.subscribe(() => {
		// 		this.utilService.popPage();
		// 	});
  }

  onDeleteArticle(articleFormData: any) {

    // Assign the rest of articleFormData object properties to article object
		Object.keys(articleFormData)
          .filter(key => key in this.article)
          .forEach(key => this.article[key] = articleFormData[key]);

    console.log('[onDeleteArticle]:', this.article);
    
    this.articlesService.deleteArticleApi(this.article).subscribe(() => {
      this.events.publish(AppPublishEvents.APP_RELOAD_ARTICLES);
      this.utilService.popPage();
    });

  }

  /**
	 * Cancel Edit. Close Page
	 */
	onCancel() {
		this.utilService.popPage();
  }
}
