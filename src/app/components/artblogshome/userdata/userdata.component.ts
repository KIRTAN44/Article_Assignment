import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import { UserQuery } from 'src/app/state/user/user.query';

@Component({
    selector: 'app-userdata',
    templateUrl: './userdata.component.html',
    styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

    public userdata: any = [];
    public articles: any = [];
    p: number = 1;
    constructor(
        private commserv: CommonService,
        private userQuery: UserQuery
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    private getData() {
        this.commserv.getArticle().subscribe((data) => {
            this.articles = data;
        });
        // This returns the loading state of the store.
        // true if it is loading else false
        // this.userQuery.getLoading().subscribe(res => this.loading = res);
        this.userQuery.getUsers().subscribe(res => {
            if (res.length > 0) {
                this.userdata = res
                this.userdata?.forEach((element: any) => {
                    let userArticles = this.articles.filter((p: any) => p.userID === element.id);
                    element.articlesown = userArticles.length;
                });
            }
        });
        this.userQuery.getLoaded().pipe(
            switchMap(() => {
                return this.commserv.getUser();
            })
        ).subscribe(res => { });
    }
}
