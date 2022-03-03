import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UserState {
    users: User[];
    isLoaded: boolean;
}

export function createInitialState(): UserState {
    return {
        users: [],
        isLoaded: false
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {

    constructor() {
        super(createInitialState());
    }

}
