/**
 *
 * */
import {SurveyService} from '../modules/survey/survey.service';
import {ListSearchVo} from './common/ListSearchVo';

export class SurveyDimension {
    private subDimensionList: SurveyDimension[];

    constructor(private surveyService?: SurveyService, public id?: number,
                public parentId?: number,
                public surveyId?: number,
                public seq?: number,
                public dimensionName?: string,
                public autoCalculateType?: number,
                public proxySubDimensionId?: number) {

    }

    public getSubDimensions() {
        if (this.subDimensionList == null) {
            let listSearchVo = new ListSearchVo();
            listSearchVo.params = {};
            listSearchVo.params.parentId = this.id;
            listSearchVo.params.surveyId = this.surveyId;

            this.surveyService.getSurveyDimensionList(listSearchVo).subscribe()
        }

        return this.subDimensionList;
    }
}
