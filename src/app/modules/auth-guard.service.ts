/**
 * Created by sunwuyang on 17/7/30.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(route);
        console.log(state);

        let url: string = state.url;

        console.log('AuthGuard#canActivate called');
        return this.checkLogin(url);
    }

    checkLogin(url) {
        console.log('this.authService.isLoggedIn' + this.authService.isLoggedIn);
        if (this.authService.isLoggedIn) {
            return true;
        }

        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/users/login']);
        return false;
    }
}
