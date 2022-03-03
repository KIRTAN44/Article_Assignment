import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { filter, Observable, take } from 'rxjs';
import { User } from './user.model';
import { UserStore, UserState } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {

    constructor(protected override store: UserStore) {
        super(store);
    }

    getUsers(): Observable<User[]> {
        return this.select(state => state.users);
    }

    getLoaded(): Observable<boolean> {
        return this.select(state => state.isLoaded).pipe(
            take(1),
            filter(res => !res),
        );
    }

    getLoading(): Observable<boolean> {
        return this.selectLoading();
    }

}
