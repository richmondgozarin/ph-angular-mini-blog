import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicPageModule } from 'ionic-angular';

import { ArticlesPageComponent } from './containers/articles-page/articles-page.component';
import { ArticlesFormComponent } from './components/articles-form/articles-form.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticlesListItemComponent } from './components/articles-list-item/articles-list-item.component';
import { CreateArticlePageComponent } from './containers/create-article-page/create-article-page.component';
import { EditArticlePageComponent } from './containers/edit-article-page/edit-article-page.component';

import { ArticlesService } from './articles.service';

export const COMPONENTS = [
  ArticlesPageComponent,
  ArticlesFormComponent, 
  ArticlesListComponent, 
  ArticlesListItemComponent, 
  CreateArticlePageComponent, 
  EditArticlePageComponent
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    IonicPageModule.forChild(ArticlesPageComponent)
  ],
  entryComponents: [COMPONENTS],
  declarations: [
    COMPONENTS
  ],
  providers: [ArticlesService]
})
export class ArticlesModule { }
