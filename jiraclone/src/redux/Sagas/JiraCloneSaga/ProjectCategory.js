import { fork, take, takeLatest, put, call, delay, select } from 'redux-saga/effects';
import { jiraCloneService } from '../../../services/JiraCloneService';
import { STATUS_CODE } from '../../../util/constanst/settingSystem';
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/JiraClone/JiraCloneConstant';



function* getAllProjectCategorySaga(action) {

    try {
        const { data, status } = yield call(() => jiraCloneService.getAllProjectCategoryService());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            });
        }
    } catch (err) {

    }

}

export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}