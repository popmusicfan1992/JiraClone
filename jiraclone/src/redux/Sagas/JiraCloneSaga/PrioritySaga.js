import { call, put, takeLatest } from "@redux-saga/core/effects";
import { priorityService } from "../../../services/PriorityService";
import { taskTypeService, TaskTypeService } from "../../../services/TaskTypeService";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA, GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../../constants/JiraClone/JiraCloneConstant";

function* getAllPrioritySaga(action) {

    try {
        const { data, status } = yield call(() => priorityService.getAllPriority());

        yield put({
            type: GET_ALL_PRIORITY,
            arrPriority: data.content
        });

    } catch (error) {
        console.log(error);
    }
}

export function* theodoiGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}