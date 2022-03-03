import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, tap } from 'rxjs';
import { UserStore } from './state/user/user.store';
import { User } from './state/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    baseUrl: any = environment.baseURL;
    baseUrl2: any = environment.baseURL2;

    constructor(
        private http: HttpClient,
        private userStore: UserStore
    ) { }

    getUser() {
        return this.http.get<User[]>(this.baseUrl).pipe(
            tap(res => {
                this.userStore.update(state => {
                    return {
                        users: res,
                        isLoaded: true
                    };
                });
                this.userStore.setLoading(false);
            }),
            map((res: User[]) => res)
        );
    }

    addUser(data: any) {
        this.userStore.setLoading(true);
        return this.http.post<User>(this.baseUrl, data).pipe(
            tap(res => {
                this.userStore.update(state => {
                    return {
                        users: [
                            ...state.users,
                            res
                        ]
                    }
                });
                this.userStore.setLoading(false);
            })
        );
    }

    addArticle(data: any) {
        return this.http.post(this.baseUrl2, data);
    }

    getArticle() {
        return this.http.get(this.baseUrl2);
    }

    updateUser(data: any, id: number) {
        return this.http.put<User>(this.baseUrl + "/" + id, data).pipe(
            tap(res => {
                this.userStore.update(state => {
                    const users = [...state.users];
                    const index = users.findIndex(u => u.id === id);
                    users[index] = {
                        ...users[index],
                        ...res
                    };
                    return {
                        ...state,
                        users
                    };
                })
            })
        );
    }

    deleteUser(id: number) {
        return this.http.delete<any>(this.baseUrl + "/" + id).pipe(
            tap(res => {
                this.userStore.update(state => {
                    return {
                        ...state,
                        todos: state.users.filter(t => t.id !== id)
                    }
                });
            })
        );
    }

    updateArticle(data: any, id: number) {
        return this.http.put<any>(this.baseUrl2 + "/" + id, data);
    }

    deleteArticle(id: number) {
        return this.http.delete<any>(this.baseUrl2 + "/" + id)
    }

    article: BehaviorSubject<[]> = new BehaviorSubject([]);
    user: BehaviorSubject<[]> = new BehaviorSubject([]);
    puser: BehaviorSubject<[]> = new BehaviorSubject([]);

}
