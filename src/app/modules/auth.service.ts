/**
 * Created by sunwuyang on 17/7/30.
 */
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {User} from '../model/User';

@Injectable()
export class AuthService {
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(user: User): Observable<boolean> {
        return Observable.of(true).delay(1000).do(val => {
            this.isLoggedIn = (user.userName === 'admin' && user.password === '123456');
            console.log(this.isLoggedIn);
            return this.isLoggedIn;
        });
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
