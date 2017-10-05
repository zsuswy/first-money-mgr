import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SurveyDimensionScoreText} from '../../../model/SurveyDimensionScoreText';
import {SurveyService} from '../survey.service';
import {ListSearchVo} from '../../../model/common/ListSearchVo';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-survey-dimension-score-text-list',
    templateUrl: './survey-dimension-score-text-list.component.html',
    styleUrls: ['./survey-dimension-score-text-list.component.scss']
})
export class SurveyDimensionScoreTextListComponent implements OnInit {
    modalTitle: string;

    surveyId: number;

    dimensionId: number;

    surveyDimensionScoreTextList: SurveyDimensionScoreText[];

    selectedSurveyDimensionScoreText: SurveyDimensionScoreText;

    constructor(private domSanitizer: DomSanitizer, private route: ActivatedRoute, private  surveyService: SurveyService) {
        this.selectedSurveyDimensionScoreText = new SurveyDimensionScoreText()
    }

    initialList() {
        let searchVo = new ListSearchVo();
        searchVo.params = {};
        searchVo.page = null;
        searchVo.params.dimensionId = this.dimensionId;
        this.surveyService.getSurveyDimensionScoreTextList(searchVo).subscribe(resp => this.surveyDimensionScoreTextList = resp.data.list);
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.surveyId = Number(params.get('surveyId'));
            this.dimensionId = Number(params.get('dimensionId'));
            this.initialList();
        });
    }

    addSurveyDimensionScoreText() {
        this.modalTitle = '新增得分卡';
        let newScoreText = new SurveyDimensionScoreText();
        newScoreText.dimensionId = this.dimensionId;
        newScoreText.surveyId = this.surveyId;
        newScoreText.resultComment = '';
        this.selectedSurveyDimensionScoreText = newScoreText;
    }

    // 删除得分卡
    removeSurveyDimensionScoreText(id) {
        if (confirm('确定删除？')) {
            this.surveyService.deleteSurveyDimensionScoreText(id).subscribe(resp => {
                console.log(resp);
                this.initialList();
            });
        }
    }

    // 选中编辑
    selectDimensionScoreTextForEdit(id) {
        this.modalTitle = '编辑得分卡';
        this.selectedSurveyDimensionScoreText = this.surveyDimensionScoreTextList.find(dimensionScoreText => dimensionScoreText.id == id);
        this.selectedSurveyDimensionScoreText.surveyId = this.surveyId;
    }

    //
    saveSurveyDimensionScoreText() {
        if (this.selectedSurveyDimensionScoreText.id == null) {
            this.surveyService.createSurveyDimensionScoreText(this.selectedSurveyDimensionScoreText).subscribe(resp => {
                console.log(resp);
                this.initialList();
            });

        } else {
            this.surveyService.updateSurveyDimensionScoreText(this.selectedSurveyDimensionScoreText).subscribe(resp => {
                console.log(resp);
                this.initialList();
            });
            this.initialList();
        }
    }

    getHtml() {
        if (this.selectedSurveyDimensionScoreText.resultComment == null) {
            return '';
        }

        return this.domSanitizer.bypassSecurityTrustHtml(this.selectedSurveyDimensionScoreText.resultComment);
    }
}
