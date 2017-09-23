import {Component} from '@angular/core';
import {User} from '../../model/User';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    user: User;

    constructor(public authService: AuthService, public router: Router) {
        this.user = new User();
    }

    login(): void {
        this.authService.login(this.user).subscribe(() => {
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

                // Redirect the user
                this.router.navigate([redirect]);
            }
        });
    }
}
