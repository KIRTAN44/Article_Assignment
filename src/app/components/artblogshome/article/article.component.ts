import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  // @Input() msgFromParent1: any = []; 
  
  public articles: any = [];
  public userdata: any = [];
  public uname: any ;
  public a:any=[];
  public arttitle: any;
  public artcon:any = [];
  uemail: any;
  public artdata: any = [];
  display = "none";
  public random: any = [];
  public random2: any = [];
  // titl: string;
  constructor(private route: ActivatedRoute,private router: Router,private commserv: CommonService) {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as {
    //   title: string
    // };
    // this.titl = state.title;
  }

  ngOnInit(): void {
    this.getArticleofuser();
    
  }

  private getArticleofuser(){
      this.commserv.user.subscribe((data:any)=>{
        this.uname= data;
        console.log(this.uname.id)
      })
      
    
    this.commserv.getArticle().subscribe((d: any)=>{
      this.a = d;
      this.a?.forEach((element:any)=>{
        if(element.userID===this.uname.id){
          this.artcon = element;
          console.log(this.artcon); 
          localStorage.setItem("title",this.artcon.title);
          localStorage.setItem("content",this.artcon.content);
          
          // for(var id in this.artcon){
          //   this.artdata.push(this.artcon);
          //   console.log(this.artdata)
          // }
          this.artdata.push({
            title: (this.artcon.title || localStorage.getItem("title")),
            content: localStorage.getItem("content")
          }) 
        }
        
        console.log(this.artdata)
      })
      
    })
    
      
      // this.userdata.forEach((e:any)=>{  
      //   if(e.id===this.articles.userID){  
      //     this.uname = e;
      //     console.log(this.uname.name)
      //   }
      // })
      // console.log(this.articles.title);
   
    // this.commserv.getArticle().subscribe((data) => {
    //   this.articles = data;
    //   this.articles?.forEach((element:any, index: any)=>{
    //     let a = this.articles.indexOf(element);
        
    //   })
    //   // if(this.articles.userID === this.userdata.id){
    //   //   console.log()
    //   // }
    // })
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  showData(ac:any){
    this.random = ac.title;
    this.random2 = ac.content;
  }
  }

