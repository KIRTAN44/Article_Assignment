import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { matchValidator } from 'src/app/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: any = FormGroup;
  // id: any=3;
  users: any=[];
  constructor(private fb: FormBuilder, private router:Router, private commserv: CommonService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), matchValidator('confirmpassword', true)])],
      confirmpassword: ['', matchValidator('password')]
    })
  }

  registerSubmit(data: any){  
    // console.log(data);
    let dataToPass = {
      name: data.name,
      email: data.email,
      password: data.password,
      id: 0
    }
    this.commserv.getUser().subscribe((data)=>
    {
      this.users = data; 
      let check = this.users.find((p: any) => p.email === dataToPass.email);
      if(!check){
        dataToPass.id = this.users[this.users.length - 1].id;
        dataToPass.id++;
        this.commserv.addUser(dataToPass).subscribe((data:any)=>{
          localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", dataToPass.email);
        localStorage.setItem("name", dataToPass.name);
        localStorage.setItem("userID", (dataToPass.id.toString()));
          this.router.navigate(["home"]);
        })
      }
      else{
        alert("user exists!!!");
        this.register.reset();
      }
    })
    
    
  }
   goToLogin(){
      this.router.navigate(['login']);
   }
}
