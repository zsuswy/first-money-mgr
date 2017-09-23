import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './login.component'
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [FormsModule, CommonModule, UserRoutingModule],
    declarations: [
        LoginComponent
    ]
})
export class UserModule {
}
