import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initialpage',
  templateUrl: './initialpage.component.html',
  styleUrls: ['./initialpage.component.css']
})
export class InitialpageComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['login']);
 }

 goToRegister(){
  this.router.navigate(['register']);
}

goToData(){
  this.router.navigate(['userdata'])
}
goToHome(){
  this.router.navigate(['iniitialpage']);
}

// toggleNavbar() {
//   console.log("clicked")
//   this.navbarOpen = !this.navbarOpen;
//   }

}
