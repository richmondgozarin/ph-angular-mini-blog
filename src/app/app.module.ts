import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicPageModule, IonicErrorHandler } from 'ionic-angular';

import { SharedService } from './shared/service/shared.service';
import { ArticlesModule } from './articles/articles.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { UtilService } from './shared/service/util.service';
import { AppHttpInterceptor } from './shared/interceptor/app-http.interceptor';
import { NgxsModule } from '@ngxs/store';

export const COMPONENTS = [
  AppComponent
]

@NgModule({
  declarations: [
    COMPONENTS
  ],
  entryComponents: [COMPONENTS],
  imports: [
    BrowserAnimationsModule,
    IonicModule.forRoot(
      AppComponent,
      {
        mode: 'ios', // enforce the theme to ios design regardless of running platform
        modalEnter: 'modal-ios-slide-in',
        modalLeave: 'modal-ios-slide-out',
        pageTransition: 'ios-transition'
      }
    ),
    NgxsModule.forRoot([]),
    IonicPageModule,
    ArticlesModule,
    HomeModule
  ],
  providers: [
    SharedService,
    UtilService,
    { 
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
	  },
  ],
  bootstrap: [IonicApp]
})
export class AppModule { }
