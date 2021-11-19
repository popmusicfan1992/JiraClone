import { call, put, takeLatest } from "@redux-saga/core/effects";
import { statusService } from "../../../services/StatusService";
import { GET_STATUS, GET_STATUS_SAGA } from "../../constants/JiraClone/JiraCloneConstant";

function* getAllStatusSaga(action) {
    try {
        const { data, status } = yield call(() => statusService.getStatus());
        yield put({
            type: GET_STATUS,
            arrStatus: data.content
        });
    } catch (error) {
        console.log(error);
    }



}
export function* theodoigetAllStatusSaga() {
    yield takeLatest(GET_STATUS_SAGA, getAllStatusSaga);
}