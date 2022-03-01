import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-initialpage2',
  templateUrl: './initialpage2.component.html',
  styleUrls: ['./initialpage2.component.css']
})
export class Initialpage2Component implements OnInit {

  displayStyle = "none";
  email : any = '';
  name: any = '';
  pass: any = '';
  editU: any = FormGroup;
  userart: any = [];
  article_id: any;

  constructor(private router: Router, private commserv: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.commserv.puser.subscribe((data: any)=>{
      this.email= localStorage.getItem("email");
      this.name = localStorage.getItem("name");
      this.pass = localStorage.getItem("password");
    })
    this.editU = this.fb.group({
      e:['', Validators.required],
      n:['', Validators.required],
      p:['', Validators.required]
    })
  }

  goToLogout(){
    this.router.navigate(['artblogshome']);
    localStorage.clear();
  }
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  editUser(data: any){
    console.log(data);
    let dataToPass = {
      email: data.e || this.email,
      name: data.n || this.name,
      password: data.p || this.pass
    }
    let id = JSON.parse(localStorage.getItem("userID")!);
    console.log(id);
    this.commserv.updateUser(dataToPass, id).subscribe( res =>{
      console.log("user updated!!!");
      localStorage.setItem("email", dataToPass.email);
      localStorage.setItem("name", dataToPass.name);
      localStorage.setItem("password", dataToPass.password);
      this.editU.reset();
      window.location.reload();
    })
  }

  deleteU(data: any){
    let dataToPass5 = {
      email: data.e || this.email,
      name: data.n || this.name,
      password: data.p || this.pass
    }
    if(confirm("Are you sure you want to delete your account? you'll redirect to Home page if you confirm and your account will be permanently deleted.")){
      console.log(dataToPass5);
      let user_id2 = parseInt(localStorage.getItem("userID")!);
          let user_id = parseInt(localStorage.getItem("userID")!);
          this.commserv.deleteUser(user_id2).subscribe((res)=>{
            alert("your account and your all articles deleted...");
            localStorage.clear();
            this.router.navigate(['artblogshome'])
            this.commserv.getArticle().subscribe((data:any)=>{
              data.forEach((element: any)=>{
                if(element.userID === user_id){
                  console.log(element);
                  this.commserv.deleteArticle(element.id).subscribe((res)=>{
                    alert("your account and your all articles deleted...");
                    localStorage.clear();
                    this.router.navigate(['artblogshome'])
                  })
                } 
              })
            })
      })
    }
    else{
      console.log("not deleted..");

    }
  }

}
