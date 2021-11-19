import { call, put, takeLatest, select } from "@redux-saga/core/effects";
import { message } from "antd";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constanst/settingSystem";
import { openNotification } from "../../../util/Libs/Notification/Notification";
import { DELETED_COMMENT_SAGA, GET_COMMENT, GET_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../../constants/JiraClone/JiraCloneConstant";
function* getCommentSaga(action) {
    try {
        const { data, status } = yield call(() => commentService.getComment(action.taskId));

        yield put({
            type: GET_COMMENT,
            listComment: data.content
        });


    } catch (error) {
        console.log(error);
    }
}

export function* theodoigetCommentSaga() {
    yield takeLatest(GET_COMMENT_SAGA, getCommentSaga);
}

//INSERT 

function* insertCommentSaga(action) {
    try {
        const { data, status } = yield call(() => commentService.insertComment(action.comment));
        console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_COMMENT_SAGA,
                taskId: action.comment.taskId
            });

        }


    } catch (error) {
        console.log(error);
    }
}

export function* theodoiinsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

function* updateCommentSaga(action) {
    try {
        const { id, content } = action;
        const { data, status } = yield call(() => commentService.updateComment(id, content));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_COMMENT_SAGA,
                taskId: action.taskId
            });

        }


    } catch (error) {
        console.log(error);
    }
}

export function* theodoiupdateCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}

function* deletedCommentSaga(action) {
    try {
        const { data, status } = yield call(() => commentService.deletedComment(action.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_COMMENT_SAGA,
                taskId: action.taskId
            });

        }


    } catch (error) {
        console.log(error);
    }
}

export function* theodoideletedCommentSaga() {
    yield takeLatest(DELETED_COMMENT_SAGA, deletedCommentSaga);
}