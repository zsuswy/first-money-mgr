import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../survey.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {SurveyQuestion} from '../../../model/SurveyQuestion';
import {Survey} from '../../../model/Survey';
import {Page} from '../../../model/common/Page';
import {SurveyQuestionOption} from '../../../model/SurveyQuestionOption';
import {ListSearchVo} from '../../../model/common/ListSearchVo';

/**
 * Created by sunwuyang on 17/7/28.
 */
@Component({
    selector: 'app-survey-question-list',
    templateUrl: './survey-question-list.component.html'
})

export class SurveyQuestionListComponent implements OnInit {
    surveyId: string;

    // 查询结果
    surveyQuestions: Array<SurveyQuestion>;

    // 当前编辑的问卷
    selectedSurveyQuestion: SurveyQuestion;

    // 编辑／新增标记位
    editModel: string;

    pageData: Page;

    // 构造函数
    constructor(private route: ActivatedRoute, private surveyService: SurveyService,
                private slimLoadingBarService: SlimLoadingBarService) {
        this.pageData = new Page();
        this.selectedSurveyQuestion = new SurveyQuestion();
    }

    public getOptions(surveyQuestion: SurveyQuestion) {
        if (surveyQuestion.questionContent == null) {
            return [];
        }
        return JSON.parse(surveyQuestion.questionContent);
    }

    ngOnInit(): void {
        this.route.paramMap
            .subscribe(params => {
                this.surveyId = params.get('surveyId');
                this.search();
            });
    }

    search(): void {
        this.slimLoadingBarService.start();

        const listSearchVo = new ListSearchVo();
        listSearchVo.page = this.pageData;
        listSearchVo.params = {'surveyId': this.surveyId};

        this.surveyService.getSurveyQuestionList(listSearchVo).subscribe(response => {
            this.surveyQuestions = response.data.list;
            this.pageData = response.data.page;
            this.slimLoadingBarService.complete();
        });
    }

    createSurveyQuestion() {
        this.selectedSurveyQuestion = new SurveyQuestion();
        this.selectedSurveyQuestion.surveyId = this.surveyId;
        let options = new Array<SurveyQuestionOption>();
        let defaultOption = new SurveyQuestionOption();
        options.push(defaultOption);
        this.selectedSurveyQuestion.questionContent = JSON.stringify(options);
    }

    deleteOption(idx) {
        // this.selectedSurveyQuestion.options.splice(idx, 1);
    }

    addOption() {
        let defaultOption = new SurveyQuestionOption();
        // this.selectedSurveyQuestion.options.push(defaultOption);
    }

    editSurveyQuestion(surveyQuestion) {
        this.selectedSurveyQuestion = surveyQuestion;
    }

    changePage(evt) {
        this.pageData.pageNO = evt.page;
        this.search();
    }

    saveSurveyQuestion(): void {
        if (this.editModel === 'new') {
            this.surveyService.createSurveyQuestion(this.selectedSurveyQuestion).subscribe(response => {
                if (response.success) {
                    this.search();
                } else {
                    alert('fail.....');
                }
            });
        } else if (this.editModel === 'edit') {
            this.surveyService.updateSurveyQuestion(this.selectedSurveyQuestion).subscribe(response => {
                if (response.success) {
                    this.search();
                } else {
                    alert('fail.....');
                }
            });
        }
    }
}
