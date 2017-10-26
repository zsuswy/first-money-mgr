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
                public proxySubDimensionId?: number,
                public description?: string,
                public params?: string) {
        if (this.description == null) {
            this.description = '';
        }
    }
}
