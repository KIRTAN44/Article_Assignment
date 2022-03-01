import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-artblogshome',
  templateUrl: './artblogshome.component.html',
  styleUrls: ['./artblogshome.component.css']
})
export class ArtblogshomeComponent implements OnInit {
  
  articles : any = [];
  userdata :  any = [];
  udata: any;
  udata2: any;
  art: any=[];
  user: any =[];
  display = "none";
  uname: any;
  uemail: any;
  div1:boolean=true;
  div2:boolean=false;
  p: number = 1;
  // currentMsgToChild1: any = [];
  constructor(private router:Router, private commserv: CommonService) { }

  ngOnInit(): void {
   
    this.commserv.getUser().subscribe((data)=>{
      this.userdata = data;
      this.commserv.getArticle().subscribe((d: any)=>{
        this.articles = d;
        this.userdata?.forEach((element : any) => {
          if(this.articles.userID === element.id){
            console.log(element);
          }
        });
        
      })
      this.userdata?.forEach((element : any) => {
        let userArticles = this.articles.filter((p: any) => p.userID === element.id);
        // console.log(userArticles)
        element.articlesown = userArticles.length;
      });
    })
  }
 goToArticle(article: any){
  console.log(article);
  this.art = article;
  this.commserv.article.next(article);
  // this.currentMsgToChild1.push(article);
  // console.log(this.user);
  //  this.router.navigate(['article'], {
  //    state:{
  //      title: article.title
  //    }
  //  })
  (this.userdata.forEach((e:any)=>{
    if(e.id===article.userID){
      this.uname = e.name;
      this.uemail =  e.email;
    }
  }))
 
 }
 openModal() {
  this.display = "block";
}
onCloseHandled() {
  this.display = "none";
}

viewAuthor(){
  (this.userdata.forEach((e:any)=>{
    if(e.id===this.art.userID){
      this.uname = e;
    }
  }))
  this.commserv.user.next(this.uname);
  this.router.navigate(['article'])
}

profileData(){
  this.udata = this.uname;
  this.udata2 = this.uemail;
}
div1Function(){
  this.div1=true;
  this.div2=false;
}
div2Function(){
  this.div2=true;
  this.div1=false;
}
}
