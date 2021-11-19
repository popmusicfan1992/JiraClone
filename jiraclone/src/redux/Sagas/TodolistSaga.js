import { fork, take, takeLatest, put, call, delay } from 'redux-saga/effects';
import Axios from 'axios';
import { ADD_TASKLIST_API, DELETE_TASKLIST_API, DONE_TASKLIST_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASKLIST_API } from '../constants/ToDoListConst';

import { toDoListService } from '../../services/TodolistService';
import { STATUS_CODE } from '../../util/constanst/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

function* getTaskAPIaction(action) {
    console.log(action);
    //put giống dispatch action

    try {
        yield put({
            type: DISPLAY_LOADING
        });

        yield delay(1000);
        let { status, data } = yield call(toDoListService.getTaskAPI);

        if (status = STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API,
                taskList: data
            });
        } else {
            console.log('erros');
        }



    } catch (error) {
        console.log('erros');
    }
    yield put({
        type: HIDE_LOADING
    });

}

export function* theoDoiActionGetTaskAPI() {
    yield takeLatest(GET_TASKLIST_API, getTaskAPIaction);
}

//Chức năng add task
function* addTaskAPIAction(action) {
    //Gọi api
    try {
        const { status } = yield call(() => { return toDoListService.addTaskAPI(action.taskName); });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            });
        }
    } catch (error) {

    }

    //Hiển thị loading
    //Thành công thì load lại task = cách gọi lại action saga load  tasklist
}

export function* theoDoiActionAddTaskAPI() {
    yield takeLatest(ADD_TASKLIST_API, addTaskAPIAction);
}

///Chức năng del task


function* delTaskAPI(action) {
    try {
        const { data, status } = yield call(() => {
            return toDoListService.delTaskAPI(action.taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            });
        }
    } catch (error) {

    }

}
export function* theoDoiActionDelTaskAPI() {
    yield takeLatest(DELETE_TASKLIST_API, delTaskAPI);
}


function* doneTaskAPI(action) {
    try {
        const { data, status } = yield call(() => {
            return toDoListService.doneTaskAPI(action.taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            });
        }
    } catch (error) {

    }

}

export function* theoDoiActionDoneTaskAPI() {
    yield takeLatest(DONE_TASKLIST_API, doneTaskAPI);
}

function* rejectTaskAPI(action) {
    try {
        const { data, status } = yield call(() => {
            return toDoListService.rejectTaskAPI(action.taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            });
        }
    } catch (error) {

    }

}

export function* theoDoiActionRejectTaskAPI() {
    yield takeLatest(REJECT_TASKLIST_API, rejectTaskAPI);
}

