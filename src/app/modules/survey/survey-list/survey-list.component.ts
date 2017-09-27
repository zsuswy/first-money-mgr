import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../survey.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Page} from '../../../model/common/Page';
import {Survey} from '../../../model/Survey';
import {SurveyClass} from '../../../model/SurveyClass';

@Component({
    selector: 'app-surveylist',
    templateUrl: './survey-list.component.html'
})

export class SurveyListComponent implements OnInit {
    // 是否显示模式对话框
    hidModal: boolean;

    // 查询结果
    surveys: Array<Survey>;
    surveyClasses: Array<SurveyClass>;

    // 查询条件
    searchCondition: any;

    pageData: Page;

    constructor(public surveyService: SurveyService,
                private slimLoadingBarService: SlimLoadingBarService) {
        this.searchCondition = {};
        this.hidModal = true;
        this.pageData = new Page();
    }

    ngOnInit(): void {
        // this.orders = this.orderService.getOrders();
        this.search();
        this.surveyService.getSurveyClassList(1).subscribe(response => {
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
}
