import { Component, OnInit } from '@angular/core';
import { ArticlesI } from '../../articles.interface';
import { UtilService } from '../../../shared/service/util.service';
import { ArticlesService } from '../../articles.service';

@Component({
  selector: 'app-create-article-page',
  template: `
  <app-articles-form
    [formMode]="'ADD'"
    [article]="article"
    (saveArticle)="onSaveArticle($event)"
    (cancelArticle)="onCancel()">
  </app-articles-form>` 
})
export class CreateArticlePageComponent implements OnInit {

  article: ArticlesI = <ArticlesI>{
    id: null,
    title: null,
    body: null
  };

  constructor(
    private utilService: UtilService,
    private articlesService: ArticlesService
  ) { }

  ngOnInit() {
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

    console.log('[onSaveArticle]:', this.article);
    
    this.articlesService.insertArticleApi(this.article).subscribe(() => {
      this.utilService.popPage();
    });

    // this.store
		// 	.dispatch(new activitiesActions.SaveActivity(this.activity))
		// 	.subscribe(() => {
		// 		this.utilService.popPage();
		// 	});
  }

  /**
	 * Cancel Edit. Close Page
	 */
	onCancel() {
		this.utilService.popPage();
  }

}
