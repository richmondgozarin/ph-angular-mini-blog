import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as moment from 'moment';

export class Months {
    names: Array<string> = new Array();
    shortNames: Array<string> = new Array();
    constructor(_names?: Array<string>, _shortNames?: Array<string>) {
        this.names = _names;
        this.shortNames = _shortNames;
    }
}

@Injectable()
export class SharedService {
    private _userInfo = new Subject<any>();
    private _appInfo = new Object();
    private _userInfoData;
    private currenUserId = '';
    private userInfoList = new Array();
    private _months: Months = new Months(moment.months(),moment.monthsShort());
    private monthsBehavior = new BehaviorSubject<Months>(this._months);
    public monthsChange = this.monthsBehavior.asObservable();

    private _initialPage : string = '';
    private _nextTabPage: string = '';

    private messageSource = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();

    constructor(
        
    ) {
        this.monthsChange.subscribe(months=>{
          this._months = months;
        });
    }

    get userInfo(): Observable<object> {
        return this._userInfo.asObservable();
    }

    set userInfo(user) {
        this._userInfo.next(user);
    }

    clearUserInfo() {
        this._userInfo.next();
    }

    set currentUserId(userId) {
        this.currenUserId = userId;
    }

    get currentUserId() {
        return this.currenUserId;
    }

    set userInfoLists(userInfo) {
        this.userInfoList.push(userInfo);
    }

    getUserInfoByUserId(userId) {
        return this.userInfoList.find(user => user.user_id === userId);
    }

    changeMessage(message: string) {
        this.messageSource.next(message)
    }

    set initialPage(initialPage : string) {
        this._initialPage = initialPage;
    }

    get initialPage() {
        return this._initialPage;
    }

    set nextTabPage(nextTabPage: string) {
        this._nextTabPage = nextTabPage;
    }

    get nextTabPage() {
        return this._nextTabPage;
    }

    set appInfo(appInfo: {}) {
        this._appInfo = appInfo;
    }

    get appInfo() {
        return this._appInfo;
    }
    
    set userInfoData(userInfoData : any) {
        this._userInfoData = userInfoData;
    }

    get userInfoData() {
        return this._userInfoData;
    }

    get months() {
        return this._months;
    }

    /**
     * Format date
     * @param date 
     * @param format 
     */
    doFormatDate(date, format): string {
      return moment(date).format(format);
    }
    
    /**
     * moment: Load capitalize month names from moment.
     * @param locale 
     */
    private setMomentLocale(locale) {
        
        // if (locale == 'vi') {
        //     new localeVI();
        // }
        moment.locale(locale);
        this.monthsBehavior.next(new Months(
            moment.localeData(locale).months(),
            moment.localeData(locale).monthsShort()
        ));
    }
}
