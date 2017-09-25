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
    templateUrl: './survey-question-list.component.html',
    providers: [SurveyService]
})

export class SurveyQuestionListComponent implements OnInit {
    // 是否显示模式对话框
    hidModal: boolean;
    surveyId: string;
    // 查询结果
    surveyQuestions: Array<SurveyQuestion>;

    // 查询条件
    searchCondition: Survey;

    // 当前编辑的问卷
    selectedSurveyQuestion: SurveyQuestion;

    // 对话框标题
    modalTitle: string;

    // 编辑／新增标记位
    editModel: string;

    pageData: Page;

    // 构造函数
    constructor(private route: ActivatedRoute, private surveyService: SurveyService,
                private slimLoadingBarService: SlimLoadingBarService) {
        this.searchCondition = new Survey();
        this.hidModal = true;
        this.pageData = new Page();
        this.onNew();
    }

    ngOnInit(): void {
        this.slimLoadingBarService.start();
        this.route.paramMap
            .subscribe(params => {
                this.surveyId = params.get('survey_id');
                this.search();
            });
    }

    search(): void {
        this.slimLoadingBarService.start();

        const listSearchVo = new ListSearchVo();
        listSearchVo.page = this.pageData;
        listSearchVo.params = {'survey_id': this.surveyId};

        this.surveyService.getSurveyQuestionList(listSearchVo).subscribe(response => {
            this.surveyQuestions = response.data.list;
            this.pageData = response.data.page;
            this.slimLoadingBarService.complete();
            // console.log(JSON.stringify(this.newOrder));
        });
    }

    onNew(): void {
        this.modalTitle = '新增题目';
        this.editModel = 'new';

        this.selectedSurveyQuestion = new SurveyQuestion();
        this.selectedSurveyQuestion.surveyId = this.surveyId;
        let options = new Array<SurveyQuestionOption>();
        let defaultOption = new SurveyQuestionOption();
        options.push(defaultOption);
        this.selectedSurveyQuestion.options = options;
    }

    onDeleteOption(idx): void {
        this.selectedSurveyQuestion.options.splice(idx, 1);
    }

    onAddOption(): void {
        let defaultOption = new SurveyQuestionOption();
        this.selectedSurveyQuestion.options.push(defaultOption);
    }

    onEdit(staticModal, surveyQuestion): void {
        staticModal.show();
        this.modalTitle = '编辑题目';
        this.editModel = 'edit';
        this.selectedSurveyQuestion = surveyQuestion;
    }

    pageChanged(evt): void {
        this.pageData.pageNO = evt.page;
        this.search();
    }


    onSubmit(staticModal): void {
        this.selectedSurveyQuestion.questionContent = JSON.stringify(this.selectedSurveyQuestion.options);
        console.log(JSON.stringify(this.selectedSurveyQuestion.options));

        if (this.editModel === 'new') {
            this.surveyService.createSurveyQuestion(this.selectedSurveyQuestion).subscribe(response => {
                if (response.result = 'success') {
                    staticModal.hide();
                    this.search();
                } else {
                    alert('fail.....');
                }
            });
        } else if (this.editModel === 'edit') {
            this.surveyService.updateSurveyQuestion(this.selectedSurveyQuestion).subscribe(response => {
                if (response.result = 'success') {
                    staticModal.hide();
                    this.search();
                } else {
                    alert('fail.....');
                }
            });
        }
    }
}
