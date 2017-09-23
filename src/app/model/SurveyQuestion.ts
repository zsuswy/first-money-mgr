import {SurveyQuestionOption} from './SurveyQuestionOption';

/**
 * Created by sunwuyang on 17/7/29.
 */
export class SurveyQuestion {
    constructor(public id?: number,
                public surveyId?: string,
                public seq?: number,
                public title?: string,
                public questionContent?: string) {
    }

    public get options(): Array<SurveyQuestionOption> {
        return null;
    }

    public set options(list: Array<SurveyQuestionOption>) {
    }
}
