import { GET_ALLPROJECT_CREATE, GET_LIST_PROJECT } from "../constants/JiraClone/JiraCloneConstant";

const initialState = {
    projectList: [],
    arrProjectList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_PROJECT: {

            state.projectList = action.projectList;
            return { ...state };
        }
        case GET_ALLPROJECT_CREATE: {
            return { ...state, arrProjectList: action.arrProjectList };
        }

        default:
            return state;
    }
};
