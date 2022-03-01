import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-adminuserdata',
  templateUrl: './adminuserdata.component.html',
  styleUrls: ['./adminuserdata.component.css']
})
export class AdminuserdataComponent implements OnInit {

  public userdata : any = [];
  public articles: any = [];

  constructor(private router: Router, private commserv: CommonService) { }

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

  deleteAdminUser(data:any){
    if(confirm("Are you sure you want to delete your account? you'll redirect to Home page if you confirm and your account will be permanently deleted.")){
      this.commserv.deleteUser(data.id).subscribe((res)=>{
        this.commserv.getArticle().subscribe((d: any)=>{
          d.forEach((element: any)=>{
            if(element.userID === data.id){
              console.log(element);
              this.commserv.deleteArticle(element.id).subscribe((res)=>{
                alert("User and his/her all articles deleted...");
                localStorage.clear();
                this.router.navigate(['artblogshome'])
              })
            } 
          })
        })
      })
    }
    else{
      alert("Not deleted any user!!!")
    }
  }
}
