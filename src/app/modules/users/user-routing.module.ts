import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '用户管理'
        },
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: '登录'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
