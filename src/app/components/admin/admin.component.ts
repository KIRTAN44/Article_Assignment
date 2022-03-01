import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
  abc: any;
  abc2: any;
  abc3: any;
  editAA: any = FormGroup;
  userID: any;
  p: number = 1;

  constructor(private router: Router, private commserv: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.commserv.getUser().subscribe((data)=>{
      this.userdata = data;
      this.commserv.getArticle().subscribe((d: any)=>{
        this.articles = d;
        console.log(this.articles.userID)
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

    this.editAA = this.fb.group({
      t:['', Validators.required],
      c:['', Validators.required]
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
    this.router.navigate(['adminarticle'])
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

  displayStyle = "none";
  
  openPopup2(data:any) {
    localStorage.setItem("userID", data.userID)
    this.displayStyle = "block";
    this.abc = data.title;
    this.abc2 = data.content;
    this.abc3 = data.id;
    localStorage.setItem("art_id", data.id)
  }
  closePopup2() {
    this.displayStyle = "none";
  }
  editAdminArticle(data: any){
    this.userID = parseInt(localStorage.getItem("userID")!);
    console.log(this.userID)
    let dataToPass = {
      title: data.t || this.abc,
      content: data.c || this.abc2,
      userID: this.userID
    }
    console.log(dataToPass)
    let aid = parseInt(localStorage.getItem("art_id")!);

    this.commserv.updateArticle(dataToPass, aid).subscribe((res)=>{
      alert("article Updated!!!")
    })
  }

  deleteArticle(data:any){
    this.commserv.deleteArticle(data.id).subscribe((res)=>{
      alert("article deleted!!!");
    })
  }

}
