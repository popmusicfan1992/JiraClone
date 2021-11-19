import { fork, take, takeLatest, put, call, delay, select } from 'redux-saga/effects';
import Axios from 'axios';
import { ADD_USER_SAGA, DELETE_USER_SAGA, EDIT_USER_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_LIST_USER, GET_LIST_USER_SAGA, GET_USER, GET_USER_BY_ID, GET_USER_SAGA, LOGOUT_SAGA, REMOVE_USER_FROM_PROJECT_SAGA, SIGN_UP_SAGA, USER_SIGNIN_API_JIRACLONE, USLOGIN } from '../../constants/JiraClone/JiraCloneConstant';
import { jiraCloneService } from '../../../services/JiraCloneService';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constanst/settingSystem';
import { userService, UserService } from '../../../services/UserService';
import { message } from 'antd';
import { notification } from 'antd';
import { openNotification } from "../../../util/Libs/Notification/Notification";




//Quản lý các action saga

function* signin(action) {
    //Gọi API bằng cách tạo 1 service


    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);
    try {

        const { data, status } = yield call(() => jiraCloneService.signinJiraClone(action.userName));
        //lưu token vào localstore khi đăng nhập thành công

        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        openNotification('success', 'sign in', "Success");
        yield put({
            type: USLOGIN,
            userLogin: data.content
        });

        let history = yield select(state => state.HistoryReducer.history);
        history.push('/projectdetails');

    } catch (error) {
        console.log(error.response.data);
        openNotification('error', 'sign in', error.response.data.content + ' missing');
    }
    yield put({
        type: HIDE_LOADING
    });

}


export function* theoDoiSignIn() {
    yield takeLatest(USER_SIGNIN_API_JIRACLONE, signin);
}
//SEARCH USER
function* getUser(action) {
    //Gọi API bằng cách tạo 1 service
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyword));
        yield put({
            type: GET_USER,
            userSearch: data.content
        });

    } catch (error) {
        console.log(error.response.data);
    }

}
export function* theoDoiGetUser() {
    yield takeLatest(GET_USER_SAGA, getUser);
}

function* getListUser(action) {
    //Gọi API bằng cách tạo 1 service
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyword));
        yield put({
            type: GET_LIST_USER,
            userList: data.content
        });

    } catch (error) {
        console.log(error.response.data);
    }

}
export function* theoDoigetListUser() {
    yield takeLatest(GET_LIST_USER_SAGA, getListUser);
}
//ASSIGN USER
function* addUserProjectSaga(action) {
    //Gọi API bằng cách tạo 1 service

    try {
        const { data, status } = yield call(() => userService.assignUserProject(action.userProject));
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_LIST_PROJECT_SAGA
            });
        }

    } catch (error) {
        console.log(error.response.data);

    }
}
export function* theoDoiaddUserProjectSaga() {
    yield takeLatest(ADD_USER_SAGA, addUserProjectSaga);
}

//REMOVE USER FROM PROJECT

function* removeUserfromproject(action) {
    //Gọi API bằng cách tạo 1 service

    try {
        const { data, status } = yield call(() => userService.removeUserFromProject(action.userProject));
        if (status === STATUS_CODE.SUCCESS) {
            message.success('Remove successful!');
            yield put({
                type: GET_LIST_PROJECT_SAGA
            });
        }

    } catch (error) {
        message.error('Remove failed!');
        console.log(error.response.data);

    }
}
export function* theoDoiremoveUserFromProject() {
    yield takeLatest(REMOVE_USER_FROM_PROJECT_SAGA, removeUserfromproject);
}

function* getUserByProjectIdSaga(action) {
    //Gọi API bằng cách tạo 1 service

    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(action.projectId));
        console.log(data);
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_USER,
                arrUserById: data.content
            });
        }

    } catch (error) {
        console.log(error);

    }

}
export function* theoDoigetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_ID, getUserByProjectIdSaga);
}


function* signUpSaga(action) {
    if (action.push == 'signup') {
        yield put({
            type: DISPLAY_LOADING
        });
        yield delay(500);
    }
    try {
        const { data, status } = yield call(() => userService.signUpUser(action.user));
        console.log(data, status);

        if (status === STATUS_CODE.SUCCESS) {
            openNotification('success', 'Sign Up', 'You have create new account successfully!!');
            if (action.push == 'signup') {
                let history = yield select(state => state.HistoryReducer.history);
                history.push('/login');
            } else {
                yield put({
                    type: GET_LIST_USER_SAGA,
                    keyword: ''
                });
            }

        } else {
            openNotification('error', 'Sign Up', 'You have create new account failed!!');

        }

    } catch (error) {
        console.log(error.response.data);
    }
    yield put({
        type: HIDE_LOADING
    });
}
export function* theoDoisignUpSaga() {
    yield takeLatest(SIGN_UP_SAGA, signUpSaga);
}

function* editUserSaga(action) {



    try {
        const { data, status } = yield call(() => userService.editUser(action.user));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_USER_SAGA,
                keyword: ''
            });
            openNotification('success', 'Edit User', 'You have Edit User successfully!!');


        } else {
            openNotification('error', 'Edit User', 'You have Edit User failed!!');

        }

    } catch (error) {
        openNotification('error', 'Edit User', error.response.data.content);
    }

}
export function* theoDoieditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}


function* DeleteUserSaga(action) {



    try {
        const { data, status } = yield call(() => userService.deleteUser(action.userId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_USER_SAGA,
                keyword: ''
            });
            openNotification('success', 'Delete User', 'You have Delete User successfully!!');


        } else {
            openNotification('error', 'Delete User', 'You Delete Delete User failed!!');

        }

    } catch (error) {

        openNotification('error', 'Delete User', error.response.data.content);
    }

}
export function* theoDoiDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, DeleteUserSaga);
}

function* LogOutSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(500);

    try {
        localStorage.clear();
        let history = yield select(state => state.HistoryReducer.history);
        history.push('/login');
    } catch (error) {

    }
    yield put({
        type: HIDE_LOADING
    });

}
export function* theoDoiLogOutSaga() {
    yield takeLatest(LOGOUT_SAGA, LogOutSaga);
}

