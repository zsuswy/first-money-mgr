import {NgModule} from '@angular/core';
import {SurveyRoutingModule} from './survey-routing.module';
import {SurveyListComponent} from './survey-list.component';
import {SurveyQuestionListComponent} from './survey-question-list.component';
import {SurveyService} from './survey.service';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

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
        SurveyQuestionListComponent
    ],
    providers: [SurveyService]
})
export class SurveyModule {
}
