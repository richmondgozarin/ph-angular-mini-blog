import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

export const COMPONENTS = [
    HomeComponent
]

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        IonicPageModule.forChild(HomeComponent),
    ],
    entryComponents: [COMPONENTS],
    declarations: [COMPONENTS]
})

export class HomeModule {}