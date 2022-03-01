import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  public userdata : any = [];
  public articles: any = [];
  p: number = 1;
  constructor(private commserv: CommonService) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(){
    this.commserv.getArticle().subscribe((data) => {
      this.articles = data;
    })
    this.commserv.getUser().subscribe((data)=>{
      this.userdata = data;
      this.userdata?.forEach((element : any) => {
        let userArticles = this.articles.filter((p: any) => p.userID === element.id);
        element.articlesown = userArticles.length;
      });
    })
  }
}
