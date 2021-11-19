import { GET_ALL_PROJECT_CATEGORY } from "../constants/JiraClone/JiraCloneConstant";

const initialState = {
    arrProjectCategory: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_CATEGORY: {
            state.arrProjectCategory = action.data;
        }
        default:
            return state;
    }
};
