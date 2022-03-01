import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any= FormGroup;
  users: any=[];
  constructor(private fb: FormBuilder, private router:Router, private commserv: CommonService) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })

    this.commserv.getUser().subscribe((data:any)=>{
      this.users = data;
    })
  }

  loginSubmit(data: any){
    if(data.email){
      let user = this.users.find((p: any) => p.email === data.email && p.password === data.password);
      if(user)  {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userID", user.id);
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        localStorage.setItem("password", user.password)
        this.router.navigate(["home"]);
        this.commserv.puser.next(user);
      }
      else {
        if((data.email==='admin@ab.com' && data.password==='admin@1234')){
          localStorage.setItem("isAdminLoggedIn", "true");
          this.router.navigate(['admin']);
        }
        else{
          localStorage.clear();
          alert("userID or Password doesnot match!!!");
          window.location.reload();
        }
      }
      
      // this.users.forEach((item:any) => {
      //   if((item.password === data.password) && (item.email ===  data.email)){
      //     localStorage.setItem("isLoggedIn", "true");
      //     this.router.navigate(["home"]);
      //   }
      //   else{
      //     localStorage.clear();
      //   }
      // });
    }
  }

  goToSignup(){
    this.router.navigate(['register']);
  }

}
