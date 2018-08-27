
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Events, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/do';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  loading:any;
  constructor(
    private loadingCtrl: LoadingController
  ) {}

  /**
   * interface method from HttpInterceptor
   * 
   * @param req 
   * @param next 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.presentLoadingDefault();
    let response: string;
    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => response = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => response = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          this.loading.dismiss();
        })
      );

      
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}
