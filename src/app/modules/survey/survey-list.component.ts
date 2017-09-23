import {Component, OnInit} from '@angular/core';
import {SurveyService} from './survey.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Page} from '../../model/common/Page';
import {Survey} from '../../model/Survey';
import {SurveyClass} from '../../model/SurveyClass';

@Component({
    selector: 'app-surveylist',
    templateUrl: './survey-list.component.html',
    providers: [SurveyService]
})

export class SurveyListComponent implements OnInit {
    // 是否显示模式对话框
    hidModal: boolean;

    // 查询结果
    surveys: Array<Survey>;
    surveyClasses: Array<SurveyClass>;

    // 查询条件
    searchCondition: Survey;

    // 当前编辑的问卷
    selectedSurvey: Survey;

    // 对话框标题
    modalTitle: string;

    // 编辑／新增标记位
    editModel: string;

    pageData: Page;

    constructor(public surveyService: SurveyService,
                private slimLoadingBarService: SlimLoadingBarService) {
        this.searchCondition = {};
        this.selectedSurvey = new Survey();
        this.hidModal = true;
        this.pageData = new Page();
    }

    ngOnInit(): void {
        // this.orders = this.orderService.getOrders();
        this.search();
        this.surveyService.getSurveyClasses(1).subscribe(response => {
            this.surveyClasses = response.data.list as SurveyClass[];
        });
    }

    search(): void {
        this.slimLoadingBarService.start();

        this.surveyService.getSurveyList({
            params: this.searchCondition,
            page: this.pageData
        }).subscribe(result => {
            this.surveys = result.data.list;
            this.pageData = result.data.page;
            this.slimLoadingBarService.complete();
            // console.log(JSON.stringify(this.newOrder));
        }, (error) => {
            console.log(error);
        });
    }

    pageChanged(evt): void {
        this.pageData.pageNO = evt.page;
        this.search();
    }

    onNew(): void {
        this.modalTitle = '新增问卷';
        this.editModel = 'new';
    }

    onEdit(staticModal, sSurvey): void {
        staticModal.show();
        this.modalTitle = '编辑问卷';
        this.editModel = 'edit';
        this.selectedSurvey = sSurvey;
    }

    onSubmit(staticModal): void {
        if (this.editModel === 'new') {
            this.surveyService.createSurvey(this.selectedSurvey).subscribe(response => {
                if (response.result = 'success') {
                    staticModal.hide();
                    this.search();
                } else {
                    alert('fail.....');
                }
            });
        } else if (this.editModel === 'edit') {
            this.surveyService.updateSurvey(this.selectedSurvey).subscribe(response => {
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
