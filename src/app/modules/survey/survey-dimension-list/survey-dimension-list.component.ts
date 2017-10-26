import {Component, Input, OnInit} from '@angular/core';
import {SurveyDimensionScoreText} from '../../../model/SurveyDimensionScoreText';
import {SurveyDimension} from '../../../model/SurveyDimension';
import {SurveyService} from '../survey.service';
import {ActivatedRoute} from '@angular/router';
import {ListSearchVo} from '../../../model/common/ListSearchVo';
import {SurveyDimensionExtraSettings} from '../../../model/SurveyDimensionExtraSettings';

@Component({
    selector: 'app-survey-dimension-list',
    templateUrl: './survey-dimension-list.component.html',
    styleUrls: ['./survey-dimension-list.component.scss']
})
export class SurveyDimensionListComponent implements OnInit {
    surveyDimensionList: SurveyDimension[] = [];

    surveyDimensionscoreTextList: SurveyDimensionScoreText[];

    selectedSurveyDimension: SurveyDimension = new SurveyDimension();
    selectedSurveyDimensionExtra: SurveyDimensionExtraSettings = new SurveyDimensionExtraSettings();
    modalTitle: string;

    @Input()
    surveyId: number;

    constructor(private surveyService: SurveyService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
                if (params.has('surveyId')) {
                    this.surveyId = Number(params.get('surveyId'));
                }
                this.initialSurveyDimensionList();
            }
        );
    }

    /**
     * 绑定列表数据
     * */
    initialSurveyDimensionList() {
        let dimensionSearchVo = new ListSearchVo();
        dimensionSearchVo.params = {};
        dimensionSearchVo.params.surveyId = this.surveyId;
        dimensionSearchVo.page = null;
        this.surveyService.getSurveyDimensionList(dimensionSearchVo).subscribe(listSearchResult => {
            this.surveyDimensionList = listSearchResult.data.list;
        });
    }

    /**
     * 获取第一层的维度，提供给下拉框使用
     * */
    getFirstLevelDimension(id = -1) {
        if (this.surveyDimensionList == null) {
            return null;
        }
        return this.surveyDimensionList.filter(
            dimension => dimension.parentId == null && dimension.id != id);
    }

    /**
     * 前端添加一个SurveyDimension
     * */
    addSurveyDimension() {
        let dimension = new SurveyDimension();
        dimension.surveyId = this.surveyId;

        this.selectedSurveyDimension = dimension;
        this.selectedSurveyDimensionExtra = new SurveyDimensionExtraSettings();

        this.modalTitle = '新增维度';
    }

    /**
     * 删除一个SurveyDimension
     * */
    removeSurveyDimension(id) {
        if (!confirm('是否删除维度:' + name)) {
            return;
        }

        this.surveyService.deleteSurveyDimension(id).subscribe(resp => {
            console.log(resp);
            this.initialSurveyDimensionList();
        });
    }

    /**
     * 对话框中，创建 或者 更新 SurveyDimension
     * */
    submitSurveyDimension() {
        // 序列化
        this.selectedSurveyDimension.params = JSON.stringify(this.selectedSurveyDimensionExtra);

        if (this.selectedSurveyDimension.id != null) {
            this.surveyService.updateSurveyDimension(this.selectedSurveyDimension).subscribe(resp => {
                this.initialSurveyDimensionList();
            });
        } else {
            this.surveyService.createSurveyDimension(this.selectedSurveyDimension).subscribe(resp => {
                this.initialSurveyDimensionList();
            });
        }
    }

    /**
     * 选中一条纪录
     * */
    selectDimensionForEdit(id) {
        this.selectedSurveyDimension = this.surveyDimensionList.find(dimension => dimension.id == id);

        // 序列化
        if (this.selectedSurveyDimension.params != null) {
            this.selectedSurveyDimensionExtra = JSON.parse(this.selectedSurveyDimension.params);
        } else {
            this.selectedSurveyDimensionExtra = new SurveyDimensionExtraSettings();
        }

        this.modalTitle = '编辑维度 ' + this.selectedSurveyDimension.dimensionName;
    }

    /**
     * 获取子维度信息
     * */
    getSubDimensionList(id): SurveyDimension[] {
        return this.surveyDimensionList.filter(dimension => dimension.parentId == id);
    }
}
