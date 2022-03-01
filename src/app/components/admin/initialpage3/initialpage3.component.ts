import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initialpage3',
  templateUrl: './initialpage3.component.html',
  styleUrls: ['./initialpage3.component.css']
})
export class Initialpage3Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  adminUserData(){
    this.router.navigate(['adminuserdata'])
  }

  logout(){
    this.router.navigate(['login'])
    localStorage.clear();
  }

}
