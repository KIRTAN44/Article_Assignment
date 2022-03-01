import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { Auth2Guard } from "./auth2.guard";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminarticleComponent } from "./components/admin/adminarticle/adminarticle.component";
import { AdminuserdataComponent } from "./components/admin/adminuserdata/adminuserdata.component";
import { ArtblogshomeComponent } from "./components/artblogshome/artblogshome.component";
import { ArticleComponent } from "./components/artblogshome/article/article.component";
import { UserdataComponent } from "./components/artblogshome/userdata/userdata.component";
import { Article2Component } from "./components/dashboard/article2/article2.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InitialpageComponent } from "./components/initialpage/initialpage.component";
import { Initialpage2Component } from "./components/initialpage2/initialpage2.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
    {path:'', redirectTo: 'artblogshome', pathMatch:'full'},
    {path:'artblogshome', component: ArtblogshomeComponent},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'initialpage', component: InitialpageComponent},
    {path:'userdata', component: UserdataComponent},
    {path:'article', component: ArticleComponent},
    {path:'home',component:DashboardComponent, canActivate:[AuthGuard]},
    {path:'article2', component: Article2Component, canActivate:[AuthGuard]},
    {path:'initialpage2',component:Initialpage2Component, canActivate:[AuthGuard]},
    {path:'admin',component:AdminComponent, canActivate:[Auth2Guard]},
    {path:'adminarticle',component:AdminarticleComponent, canActivate:[Auth2Guard]},
    {path:'adminuserdata',component:AdminuserdataComponent, canActivate:[Auth2Guard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}