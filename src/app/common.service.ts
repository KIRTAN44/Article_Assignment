import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl: any = environment.baseURL;
  baseUrl2: any = environment.baseURL2;

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get(this.baseUrl);
  }

  addUser(data: any){
    return this.http.post(this.baseUrl, data).pipe((response) => {
      return response;
    });
  }

  addArticle(data: any){
    return this.http.post(this.baseUrl2, data);
  }

  getArticle(){
    return this.http.get(this.baseUrl2);
  }

  updateUser(data: any, id: number){
    return this.http.put<any>(this.baseUrl+"/"+id , data);
  }

  deleteUser(id: number){
    return this.http.delete<any>(this.baseUrl+"/"+id)
  }

  updateArticle(data: any, id: number){
    return this.http.put<any>(this.baseUrl2+"/"+id, data);
  }

  deleteArticle(id: number){
    return this.http.delete<any>(this.baseUrl2+"/"+id)
  }

  article: BehaviorSubject<[]> = new BehaviorSubject([]);
  user: BehaviorSubject<[]> = new BehaviorSubject([]);
  puser: BehaviorSubject<[]> = new BehaviorSubject([]);

}
