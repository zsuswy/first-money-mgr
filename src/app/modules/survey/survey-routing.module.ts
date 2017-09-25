import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import {SurveyListComponent} from './survey-list/survey-list.component';
import {SurveyQuestionListComponent} from './survey-question-list/survey-question-list.component';
import {AuthGuard} from '../auth-guard.service';

const routes: Routes = [{
        path: '',
        data: {title: '测评管理'},
        // canActivate: [AuthGuard],
        children: [
            {
                path: 'list',
                component: SurveyListComponent,
                data: {
                    title: '测评列表'
                }
            },
            {
                path: ':survey_id/questions',
                component: SurveyQuestionListComponent,
                data: {
                    title: '问卷题目列表'
                }
            }]
    }
    ]
;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveyRoutingModule {
}
