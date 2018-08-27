import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';

@Injectable()
export class UtilService {

    constructor(
        private app: App
    ) { }

    public openPage(page: any, outsideTabsView: boolean = true, param: Object = {}): void {

        let navCtrlList = this.app.getRootNavs();

        if (outsideTabsView) {
            if (navCtrlList[0] != null) {
                navCtrlList[0].push(page, param, {animate: true, direction: 'forward'});
            }
        } else {
            const nav = this.app.getActiveNav();
            nav.push(page, param, {animate: true, direction: 'forward'});
        }

    }

    public popPage() {
        const navCtrlList = this.app.getRootNavs();

        if (navCtrlList[0] != null) {
            navCtrlList[0].pop();
        }
    }
}
