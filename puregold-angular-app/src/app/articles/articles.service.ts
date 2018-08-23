import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ArticlesI } from './articles.interface';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ArticlesService {
    private dataLoaded: boolean = false;
    private articleList: Array<ArticlesI> = [];
    private userId = 1;
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Get Articles Cache
     */
    getArticlesCache(): Observable<any> {
        if (this.isDataLoaded()) {
        return Observable.of(this.articleList);
        } else {
        return this.getArticlesAPI();
        }
    }

    /**
     * Get articles api
     */
    getArticlesAPI(): Observable<ArticlesI> {
        return this.http
        .get<any>(environment.API_BASE_PATH)
        .pipe(
            tap(
            response => {
                if (response.error) {
                    console.log(response.error);
                }
                if (response) {
                    console.log('[get_Articles_API]...' , response);
                    if (!this.articleList) {
                        this.articleList = response;
                    } else {
                        if (response.length > 0) {
                            response.forEach(item => {
                                this.refreshList(item);
                            })
                        }
                    }
                    this.dataLoaded = true; 
                }
            },
            error => {
                console.log(error);
            }
            )
        );
    }

    /**
     * Update information to article service
     * @param article 
     */
    updateArticleApi(article: ArticlesI): Observable<ArticlesI> {
        let updateURL = environment.API_BASE_PATH +'/'+ article.userId;
        return this.http.put<any>(updateURL, article)
            .pipe(
                tap(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    }
                    if (response) {
                        console.log('updated article id: ', response);
                        this.updateArticleCache(response);
                    }
                },
                error => {
                    console.log(error);
                }
            )
        );
    }
        
    /**
     * Save information to article service
     * @param article 
     */
    insertArticleApi(article: ArticlesI): Observable<any> {
        article.userId = this.userId;
        
        return this.http
            .post(environment.API_BASE_PATH, article)
            .pipe(
                tap(
                    response => {
                        if (response.error) {
                            console.log(response.error);
                        }
                        if (response) {
                            console.log("added article id: ", response);
                            if (this.articleList) {
                                this.refreshList(response);
                            }
                        }
                    },
                    error => {
                        console.log(error);
                    }
                )
            );
    }

    /**
     * Delete information to article service
     * @param article 
     */
    deleteArticleApi(article: ArticlesI): Observable<ArticlesI> {
        let deleteURL = environment.API_BASE_PATH +'/'+ article.id;
        return this.http.delete<any>(deleteURL)
            .pipe(
                tap(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    }
                    if (response) {
                        console.log('deleted article id: ', response);
                        this.updateArticleCache(article, true);
                    }
                },
                error => {
                    console.log(error);
                }
            )
        );
    }

    /** PRIVATE FUNCTIONS */

    /**
     * Refresh list of article
     */
    private refreshList(article: ArticlesI) {
        this.articleList.push({...article});
    }

    /**
     * Update/delete article in cache
     * @param article 
     */
    private updateArticleCache(article: ArticlesI, isDelete=false) {
        let findIndex = this.articleList.findIndex(g => g.id == article.id);
        if (isDelete) {
            this.articleList.splice(findIndex, 1);
        } else {
            this.articleList[findIndex] = article;
        }
    }


    /** HELPER FUNCTIONS */

    /**
     * Check if data is loaded
     */
    isDataLoaded(): boolean {
        return this.dataLoaded;
    }

    /**
     * Find article by id
     * @param id 
     */
    findArticleById(id): ArticlesI {
        return this.articleList.find(obj => obj.id === id);
    }

    /**
     * Reset article data
     */
    resetData() {
        this.dataLoaded = false;
        this.articleList = new Array();
    }
}
