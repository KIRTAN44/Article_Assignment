import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InitialpageComponent } from './components/initialpage/initialpage.component';
import { ArtblogshomeComponent } from './components/artblogshome/artblogshome.component';
import { UserdataComponent } from './components/artblogshome/userdata/userdata.component';
import { ArticleComponent } from './components/artblogshome/article/article.component';
import { Initialpage2Component } from './components/initialpage2/initialpage2.component';
import { Article2Component } from './components/dashboard/article2/article2.component';
import { AdminComponent } from './components/admin/admin.component';
import { Initialpage3Component } from './components/admin/initialpage3/initialpage3.component';
import { AdminarticleComponent } from './components/admin/adminarticle/adminarticle.component';
import { AdminuserdataComponent } from './components/admin/adminuserdata/adminuserdata.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InitialpageComponent,
    ArtblogshomeComponent,
    UserdataComponent,
    ArticleComponent,
    Initialpage2Component,
    Article2Component,
    AdminComponent,
    Initialpage3Component,
    AdminarticleComponent,
    AdminuserdataComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
