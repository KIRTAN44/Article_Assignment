import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  articles : any = [];
  userdata :  any = [];
  artdata: any = [];
  udata: any;
  udata2: any;
  udata3: any;
  art: any=[];
  user: any =[];
  display = "none";
  displayStyle = "none";
  displayStyle2 = "none";
  uname: any;
  uemail: any;
  div1:boolean=true;
  div2:boolean=false;
  h2 = false;
  dis = false;
  addarticle: any = FormGroup;
  userart: any = [];
  abc = '';
  abc2 = '';
  abc3 : any ;
  editA: any = FormGroup;
  p: number = 1;

  constructor(private router:Router, private commserv: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addarticle = this.fb.group({
      title:['', Validators.required],
      content:['', Validators.required],
    })
    
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

    this.editA = this.fb.group({
      t:['', Validators.required],
      c:['', Validators.required]
    })
  }

  articleSubmit(data:any){
    this.commserv.puser.subscribe((data:any)=>{
      this.udata3 = data;

    })
    // let uid = localStorage.getItem("userID");
    let uid = JSON.parse(localStorage.getItem("userID")!);
    console.log(uid);
    let dataToPass = {
      title: data.title,
      content: data.content,
      userID: uid,
      id: 0
    }
    this.commserv.getArticle().subscribe((data:any)=>{
      this.artdata = data;
      dataToPass.id = this.artdata[this.artdata.length - 1].id;
      dataToPass.id++;
      console.log(dataToPass)
      this.commserv.addArticle(dataToPass).subscribe((data:any)=>{
        console.log("hi" + data);
        this.router.navigate(['home'])
        this.addarticle.reset();
        alert('article added...');
        // window.location.reload();
      })
    })
  }

  // ngOnDestroy(): void{
  //   localStorage.clear();
  // }

  logOut(){
    this.router.navigate(['artblogshome']);
    localStorage.clear();
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
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  
  viewAuthor(){
    (this.userdata.forEach((e:any)=>{
      if(e.id===this.art.userID){
        this.uname = e;
      }
    }))
    this.commserv.user.next(this.uname);
    this.router.navigate(['article2'])
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

  userArticle(){
    this.h2 = true;
    this.commserv.getArticle().subscribe((data: any)=>{
      data.forEach((element: any)=>{
        console.log(element.userID);
        let user_id = parseInt(localStorage.getItem("userID")!)
        if(element.userID === user_id){
          this.userart.push({
            title: element.title,
            content: element.content,
            id: element.id
          })
        }
      })
      this.dis = true;
    })
  }

  openPopup2(userarticle: any) {
    console.log(userarticle)
    this.displayStyle2 = "block";
    this.abc = userarticle.title;
    this.abc2 = userarticle.content;
    this.abc3 = userarticle.id;
    localStorage.setItem("art_id", userarticle.id)
  }
  closePopup2() {
    this.displayStyle2 = "none";
  }

  editArticle(data:any){
    let id2 = parseInt(localStorage.getItem("userID")!);
    let dataToPass2 = {
      title: data.t || this.abc,
      content: data.c || this.abc2,
      userID: id2
    }
    let id = parseInt(localStorage.getItem("art_id")!);
    console.log(id);
    this.commserv.updateArticle(dataToPass2, id).subscribe((res:any)=>{
      alert("article updated")
    })
    this.editA.reset();
    window.location.reload();
  }

  deleteArt(data:any){
    this.commserv.deleteArticle(data.id).subscribe((res)=>{
      alert("article deleted!!!");
    })
  }
  }


