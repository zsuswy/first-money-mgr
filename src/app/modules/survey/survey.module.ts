import {NgModule} from '@angular/core';
import {SurveyRoutingModule} from './survey-routing.module';
import {SurveyListComponent} from './survey-list/survey-list.component';
import {SurveyQuestionListComponent} from './survey-question-list/survey-question-list.component';
import {SurveyService} from './survey.service';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { SurveyInfoComponent } from './survey-info/survey-info.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SurveyRoutingModule,
        HttpModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        HttpClientModule
    ],
    declarations: [
        SurveyListComponent,
        SurveyQuestionListComponent,
        SurveyInfoComponent
    ],
    providers: [SurveyService]
})
export class SurveyModule {
}
