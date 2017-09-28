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
import {SurveyDimension} from '../../../model/SurveyDimension';
import {SurveyQuestionOptionScore} from '../../../model/SurveyQuestionOptionScore';
import {forEach} from '@angular/router/src/utils/collection';

/**
 * Created by sunwuyang on 17/7/28.
 */
@Component({
    selector: 'app-survey-question-list',
    templateUrl: './survey-question-list.component.html'
})

export class SurveyQuestionListComponent implements OnInit {
    // 题目标题搜索条件
    search_title: string;

    // 参数
    surveyId: string;

    // 编辑框的标题
    modalTitle: string;

    // Dimension 列表
    surveyDimensionList: SurveyDimension[];

    // 当前 Question 列表
    surveyQuestionList: Array<SurveyQuestion>;

    // 当前编辑的 Question
    selectedSurveyQuestion: SurveyQuestion;

    // 当前选中 Question 的 Option列表
    selectedSurveyQuestionOptionList: Array<SurveyQuestionOption>;

    // 分页数据
    pageData: Page;

    /**
     * 构造函数
     * */
    constructor(private route: ActivatedRoute, private surveyService: SurveyService,
                private slimLoadingBarService: SlimLoadingBarService) {
        this.pageData = new Page();
        this.selectedSurveyQuestion = new SurveyQuestion();
    }

    /**
     * 初始化
     * */
    ngOnInit(): void {
        this.route.paramMap
            .subscribe(params => {
                // 根据路由信息获取参数
                this.surveyId = params.get('surveyId');
                this.search();

                // 获取维度信息
                let listSearchVo = new ListSearchVo();
                listSearchVo.page = null;
                listSearchVo.params = {'surveyId': this.surveyId};
                this.surveyService.getSurveyDimensionList(listSearchVo).subscribe(resp => this.surveyDimensionList = resp.data.list);
            });
    }

    /**
     * Question列表查询
     * */
    search(): void {
        this.slimLoadingBarService.start();

        const listSearchVo = new ListSearchVo();
        listSearchVo.page = this.pageData;
        listSearchVo.params = {'surveyId': this.surveyId, 'title': this.search_title};

        this.surveyService.getSurveyQuestionList(listSearchVo).subscribe(response => {
            this.surveyQuestionList = response.data.list;
            this.pageData = response.data.page;
            this.slimLoadingBarService.complete();
        });
    }

    /**
     * 解析Question的内容，得到option JSON对象
     * */
    public getOptions(surveyQuestion: SurveyQuestion) {
        if (surveyQuestion.questionContent == null) {
            return [];
        }
        return JSON.parse(surveyQuestion.questionContent);
    }

    /**
     * 准备得分卡
     * */
    public prepareScoreBoardForEdit() {
        // 如果是新建，那么创建得分卡
        if (this.selectedSurveyQuestion.id == null) {
            this.selectedSurveyQuestionOptionList = [];

            let defaultOption = new SurveyQuestionOption();
            defaultOption.optionScoreList = this.createScoreBoard();

            this.selectedSurveyQuestionOptionList.push(defaultOption);

            return;
        }

        // 如果是编辑，那么获取得分卡，然后合并
        if (this.selectedSurveyQuestion.questionContent == null) {
            this.selectedSurveyQuestionOptionList = [];

            // 如果没有任何选项，那么创建一个默认选项
            let defaultOption = new SurveyQuestionOption();
            this.selectedSurveyQuestionOptionList.push(defaultOption);
        } else {
            this.selectedSurveyQuestionOptionList = JSON.parse(this.selectedSurveyQuestion.questionContent);
        }

        // 遍历每一个选项，合并得分卡
        for (let i = 0; i < this.selectedSurveyQuestionOptionList.length; i++) {
            let option = this.selectedSurveyQuestionOptionList[i];

            // 原来的数据
            let oldScoreList = option.optionScoreList;

            // 合并结果
            let newScoreList = this.createScoreBoard();

            // 原来的数据不为空，那么合并
            if (oldScoreList != null) {
                for (let j = 0; j < oldScoreList.length; j++) {
                    let idx = newScoreList.findIndex(sc => sc.dimensionId == oldScoreList[j].dimensionId);
                    // 如果找到，那么替换
                    if (idx > -1) {
                        newScoreList[idx] = oldScoreList[j];
                    }
                }
            }

            this.selectedSurveyQuestionOptionList[i].optionScoreList = newScoreList;
        }

    }

    /**
     * 根据维度创建得分卡模版
     * */
    public createScoreBoard(): Array<SurveyQuestionOptionScore> {
        let scoreList = [];

        for (let i = 0; i < this.surveyDimensionList.length; i++) {
            scoreList.push({
                score: null,
                dimensionId: this.surveyDimensionList[i].id,
                dimensionName: this.surveyDimensionList[i].dimensionName
            });
        }
        return scoreList;
    }

    createSurveyQuestion() {
        this.modalTitle = '创建题目';
        this.selectedSurveyQuestion = new SurveyQuestion();
        this.selectedSurveyQuestion.surveyId = this.surveyId;

        this.prepareScoreBoardForEdit();
    }

    /**
     * 删除 Option
     * */
    deleteOption(idx) {
        this.selectedSurveyQuestionOptionList.splice(idx, 1);
    }

    /**
     * 添加新的Option
     * */
    addOption() {
        let option = new SurveyQuestionOption();
        option.optionScoreList = this.createScoreBoard();

        this.selectedSurveyQuestionOptionList.push(option);
    }

    /**
     * 开始编辑 Question
     * */
    editingSurveyQuestion(surveyQuestion) {
        this.selectedSurveyQuestion = surveyQuestion;
        this.modalTitle = '编辑题目';

        this.prepareScoreBoardForEdit();
    }

    /**
     * 分页事件
     * */
    changePage(evt) {
        this.pageData.pageNO = evt.page;
        this.search();
    }

    /**
     * 保存 Question，包括新增和编辑操作
     * */
    saveSurveyQuestion(): void {
        this.selectedSurveyQuestion.questionContent = JSON.stringify(this.selectedSurveyQuestionOptionList);

        if (this.selectedSurveyQuestion.id == null) {
            this.surveyService.createSurveyQuestion(this.selectedSurveyQuestion).subscribe(response => {
                if (response.success) {
                    this.search();
                } else {
                    alert('fail.....');
                }
            });
        } else {
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
