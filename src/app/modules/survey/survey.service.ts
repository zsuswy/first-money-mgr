/**
 * Created by sunwuyang on 17/7/28.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ResponseResult} from '../../model/common/ResponseResult';
import {ListSearchVo} from '../../model/common/ListSearchVo';
import {Survey} from '../../model/Survey';
import {SurveyQuestion} from '../../model/SurveyQuestion';
import {ListResponseResult} from '../../model/common/ListResponseResult';

@Injectable()
export class SurveyService {
    SERVICE_HOST_PREFIX = 'http://quiz.ronmob.com/qz';

    constructor(private http: HttpClient) {
    };

    getSurveyList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/survey/list', listSearchVo);
    }

    createSurvey(survey: Survey): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/survey/create', survey);
    }

    updateSurvey(survey: Survey): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/survey/update', survey);
    }

    getSurveyQuestionList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyQuestion/list', listSearchVo);
    }

    createSurveyQuestion(surveyQuestion: SurveyQuestion): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyQuestion/create', surveyQuestion);
    }

    updateSurveyQuestion(surveyQuestion: SurveyQuestion): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyQuestion/update', surveyQuestion);
    }

    getSurveyClasses(enabled: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyClass/list?enabled=' + enabled);
    }
}
