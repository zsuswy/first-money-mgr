import {NgModule} from '@angular/core';
import {SurveyRoutingModule} from './survey-routing.module';
import {SurveyListComponent} from './survey-list/survey-list.component';
import {SurveyQuestionListComponent} from './survey-question-list/survey-question-list.component';
import {SurveyService} from './survey.service';
import {SurveyInfoComponent} from './survey-basic-info/survey-basic-info.component'
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {FileUploadModule} from 'ng2-file-upload';
import {ImgUploadComponent} from './img-upload/img-upload.component';
import {SurveyDimensionListComponent} from './survey-dimension-list/survey-dimension-list.component';
import {SurveyDimensionScoreTextListComponent} from './survey-dimension-score-text-list/survey-dimension-score-text-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SurveyRoutingModule,
        HttpModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        HttpClientModule,
        TabsModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        FileUploadModule
    ],
    declarations: [
        SurveyListComponent,
        SurveyQuestionListComponent,
        SurveyInfoComponent,
        ImgUploadComponent,
        SurveyDimensionListComponent,
        SurveyDimensionScoreTextListComponent
    ],
    providers: [SurveyService]
})
export class SurveyModule {
}
