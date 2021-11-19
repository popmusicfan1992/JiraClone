import { fork, take, takeLatest, put, call, delay, select } from 'redux-saga/effects';
import { jiraCloneService } from '../../../services/JiraCloneService';
import { jiraCloneProjectService, jiraCloneService2 } from '../../../services/JiraCloneService2';
import { STATUS_CODE } from '../../../util/constanst/settingSystem';
import { CREATE_PROJECT_CATEGORY, CREATE_PROJECT_CATEGORY_SAGA, DELETE_PROJECT_SAGA, GET_ALLPROJECT_CREATE, GET_ALLPROJECT_CREATE_SAGA, GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PROJECT_DETAILS_SAGA, GET_USER_BY_ID, UPDATE_PROJECT, UPDATE_PROJECT_SAGA } from '../../constants/JiraClone/JiraCloneConstant';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { message } from 'antd';
import { notification } from 'antd';
import { openNotification } from '../../../util/Libs/Notification/Notification';

function* createProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);
    try {
        const { data, status } = yield call(() => jiraCloneService.createProjectAuthorizationService(action.newProject));
        console.log(data);
        console.log(status);
        if (status === STATUS_CODE.SUCCESS) {
            openNotification('success', 'Project', 'You have create new project successfully!!');
            let history = yield select(state => state.HistoryReducer.history);
            history.push('/projectmanagament');
        }

    } catch (err) {
        openNotification('error', 'Project', 'failed');
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    });

}

export function* theoDoiCreateProject() {
    yield takeLatest(CREATE_PROJECT_CATEGORY_SAGA, createProjectSaga);
}


//Saga dùng để getall project từ api
function* getAllProject(action) {
    try {
        const { data, status } = yield call(() => jiraCloneService.GetListProjectService());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content
            });
        }
    } catch (err) {

    }
}



export function* theoDoiGetListProject() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getAllProject);
}

//Saga dùng để update project

function* updateProject(action) {
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);
    try {
        const { data, status } = yield call(() => jiraCloneService.updateProjectService(action.projectUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT_SAGA
            });

        }
        yield put({
            type: 'CLOSE_DRAWER'
        });
    } catch (err) {

    }
    yield put({
        type: HIDE_LOADING
    });
}
export function* theoDoiUpdateProject() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProject);
}
//Saga delete project

function* deleteProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);
    try {
        const { data, status } = yield call(() => jiraCloneProjectService.deleteProject(action.projectId));
        if (status === STATUS_CODE.SUCCESS) {
            message.success('Deleted Successful!');
            yield put({
                type: GET_LIST_PROJECT_SAGA
            });

        }
        yield put({
            type: 'CLOSE_DRAWER'
        });
    } catch (err) {
        message.error('Deleted Failed!!');
    }
    yield put({
        type: HIDE_LOADING
    });
}
export function* theoDoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//GETPROJECT DETAILS
function* getProjectDetailsSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);
    try {
        const { data, status } = yield call(() => jiraCloneProjectService.getProjectDetails(action.projectId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'PUT_PROJECT_DETAILS',
                projectDetails: data.content
            });

        }

    } catch (err) {
        console.log(err);
        let history = yield select(state => state.HistoryReducer.history);
        history.push('/projectdetails');
    }
    yield put({
        type: HIDE_LOADING
    });

}
export function* theoDoiGetprojectDetails() {
    yield takeLatest(GET_PROJECT_DETAILS_SAGA, getProjectDetailsSaga);
}

//SAGA PROJECT ALL CREATE FORM

function* getAllProjectSaga(action) {
    try {
        const { data, status } = yield call(() => jiraCloneProjectService.getAllProject());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALLPROJECT_CREATE,
                arrProjectList: data.content
            });
            yield put({
                type: GET_USER_BY_ID,
                projectId: data.content[ 0 ].id
            });
        }
    } catch (err) {
        console.log(err);

    }
}



export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALLPROJECT_CREATE_SAGA, getAllProjectSaga);
}
