import {Component, OnInit} from '@angular/core';
import {Survey} from '../../../model/Survey';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyService} from '../survey.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-survey-info',
    templateUrl: './survey-basic-info.component.html',
    styleUrls: ['./survey-basic-info.component.scss']
})
export class SurveyBasicInfoComponent implements OnInit {
    // 当前编辑的问卷
    currSurvey: Survey;

    // Survey 高级设置
    surveyAdvSettings: any;

    // 当前的surveyId
    surveyId: number;

    surveyClasses = [];

    constructor(private domSanitizer: DomSanitizer,
                private surveyService: SurveyService,
                private route: ActivatedRoute, private router: Router) {
        this.currSurvey = new Survey()
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.surveyId = Number(params.get('surveyId'));

            this.surveyService.getSurvey(this.surveyId).subscribe(resp => {

                this.currSurvey = resp.data;
                this.surveyAdvSettings = JSON.parse(this.currSurvey.params);
            });
        });
    }

    getHtml() {
        return this.domSanitizer.bypassSecurityTrustHtml(this.currSurvey.description);
    }

    /**
     * 保存Survey
     * */
    saveSurvey() {
        this.currSurvey.params = JSON.stringify(this.surveyAdvSettings);
        this.saveSurvey();

        if (this.currSurvey.id == null) {
            this.surveyService.createSurvey(this.currSurvey).subscribe(
                responseResult => {
                    if (responseResult.success) {
                        console.log('created successfully!');
                        this.router.navigate(['/survey/list'])
                    }
                },
                error => console.log(error));
        } else {
            this.surveyService.updateSurvey(this.currSurvey).subscribe(
                responseResult => {
                    if (responseResult.success) {
                        console.log('update successfully!');
                        this.router.navigate(['/survey/list'])
                    }
                },
                error => console.log(error));
        }
        console.log(this.currSurvey);
    }

    fileUploaded(evt) {
        this.currSurvey.image = evt;
    }

}
