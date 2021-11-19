import { GET_ALL_PRIORITY, GET_ALL_TASK_TYPE } from "../constants/JiraClone/JiraCloneConstant";

const initialState = {
    arrPriority: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRIORITY: {

            return { ...state, arrPriority: action.arrPriority };
        }


        default:
            return state;
    }
};
