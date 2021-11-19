import { GET_STATUS } from "../constants/JiraClone/JiraCloneConstant";

const initialState = {
    arrStatus: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_STATUS: {
            return { ...state, arrStatus: action.arrStatus };
        }

        default:
            return state;
    }
};
