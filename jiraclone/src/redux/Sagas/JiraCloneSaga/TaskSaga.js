import { taskService } from "../../../services/TaskService";
import { call, put, takeLatest, select } from "@redux-saga/core/effects";
import { ADD_ASSIGNESS, CHANGE_TASK_MODAL, CREATE_TASK, CREATE_TASK_SAGA, GET_PROJECT_DETAILS_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_UPDATE_TASK_SAGA, REMOVE_ASSIGNESS, REMOVE_TASK_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../constants/JiraClone/JiraCloneConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { STATUS_CODE } from "../../../util/constanst/settingSystem";
import { message, notification } from "antd";
import { openNotification } from "../../../util/Libs/Notification/Notification";

function* CreateTaskSaga(action) {
    console.log(action);
    try {
        yield put({
            type: DISPLAY_LOADING
        });
        const { data, status } = yield call(() => taskService.createTask(action.task));
        console.log(data, status);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'CLOSE_DRAWER'
            });
            openNotification('success', 'task', 'You have create new task successfully!!');

        }
        yield put({
            type: GET_PROJECT_DETAILS_SAGA,
            projectId: action.task.projectId
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: 'CLOSE_DRAWER'
        });
        openNotification('error', 'task', 'Errror create task');
    }

    yield put({
        type: HIDE_LOADING
    });
}

export function* theodoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, CreateTaskSaga);
}

function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(action.taskId));


        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content
        });
    } catch (error) {
        console.log(error);
    }
}

export function* theodoigetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}


function* updateTaskStatusSaga(action) {
    console.log(action);
    try {
        const { data, status } = yield call(() => taskService.updateStatusTask(action.taskStatusUpdate));
        console.log(data, status);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAILS_SAGA,
                projectId: action.projectId
            });
        }

    } catch (error) {
        console.log(error);
    }
}

export function* theodoiupdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

function* HandleChangeUpdateTaskSaga(action) {
    //Xài switch case qua trung gian về dispatch là 1 hàm bất đồng bộ nên cần yield put để đồng bộ
    //gọi action làm thay đổi taskdetailmodal trên reducer
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { value, name } = action;
            yield put({
                type: CHANGE_TASK_MODAL,
                value,
                name
            });
        } break;
        case REMOVE_ASSIGNESS: {
            yield put({
                type: REMOVE_ASSIGNESS,
                userId: action.userId
            });
        } break;
        case ADD_ASSIGNESS: {
            yield put({
                type: ADD_ASSIGNESS,
                userSelected: action.userSelected
            });
        }

    }
    const { taskDetailModal } = yield select(state => state.TaskReducer);
    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    });
    const taskUpdate = { ...taskDetailModal, listUserAsign };
    try {
        const { data, status } = yield call(() => taskService.updateTask(taskUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAILS_SAGA,
                projectId: taskUpdate.projectId
            });
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdate.taskId
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* theodoiHandleChanePostAPIUpdateTaskSaga() {
    yield takeLatest(HANDLE_CHANGE_POST_API_UPDATE_TASK_SAGA, HandleChangeUpdateTaskSaga);
}

// REMOVE TASSK
function* RemoveTaskStatusSaga(action) {
    let modal = document.getElementById('close_modal');
    modal.click();
    try {
        const { data, status } = yield call(() => taskService.removeTask(action.taskId));
        console.log(data, status);

        if (status === STATUS_CODE.SUCCESS) {
            message.success('Delete task successfully');
            yield put({
                type: GET_PROJECT_DETAILS_SAGA,
                projectId: action.projectId
            });
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskId
            });
        } else {
            message.error('Deleted failed');
        }

    } catch (error) {
        console.log(error);
    }
}

export function* theodoiRemoveTaskStatusSaga() {
    yield takeLatest(REMOVE_TASK_SAGA, RemoveTaskStatusSaga);
}