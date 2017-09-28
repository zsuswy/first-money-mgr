import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import {SurveyListComponent} from './survey-list/survey-list.component';
import {SurveyQuestionListComponent} from './survey-question-list/survey-question-list.component';
import {SurveyBasicInfoComponent} from './survey-basic-info/survey-basic-info.component';
import {SurveyDimensionListComponent} from './survey-dimension-list/survey-dimension-list.component';
import {SurveyDimensionScoreTextListComponent} from './survey-dimension-score-text-list/survey-dimension-score-text-list.component';

const routes: Routes = [{
    path: '',
    data: {title: '测评管理'},
    // canActivate: [AuthGuard],
    children: [
        {
            path: '',
            component: SurveyListComponent,
            data: {
                title: '测评列表'
            }
        }, {
            path: 'list',
            component: SurveyListComponent,
            data: {
                title: '测评列表'
            }
        },
        {
            path: ':surveyId/questions',
            component: SurveyQuestionListComponent,
            data: {
                title: '问卷题目列表'
            }
        },
        {
            path: ':surveyId/dimension',
            children: [
                {
                    path: '',
                    data: {
                        title: '问卷维度管理'
                    },
                    children: [
                        {
                            path: '',
                            component: SurveyDimensionListComponent,
                            data: {
                                title: '问卷维度列表'
                            }
                        },
                        {
                            path: 'list',
                            component: SurveyDimensionListComponent,
                            data: {
                                title: '问卷维度列表'
                            }
                        },
                        {
                            path: ':dimensionId/scoreText/list',
                            component: SurveyDimensionScoreTextListComponent,
                            data: {
                                title: '问卷维度得分卡列表'
                            }
                        }]
                },
            ]
        },
        {
            path: 'create',
            component: SurveyBasicInfoComponent,
            data: {
                title: '创建测评'
            }
        },
        {
            path: ':surveyId/edit',
            component: SurveyBasicInfoComponent,
            data: {
                title: '编辑测评'
            }
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveyRoutingModule {
}
