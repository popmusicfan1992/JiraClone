import { GET_ALL_TASK_TYPE } from "../constants/JiraClone/JiraCloneConstant";

const initialState = {
    arrTaskType: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TASK_TYPE: {

            return { ...state, arrTaskType: action.arrTaskType };
        }


        default:
            return state;
    }
};
