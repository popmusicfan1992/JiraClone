import { GET_COMMENT } from "../constants/JiraClone/JiraCloneConstant";

const initialState = {
    listComment: [],

};

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_COMMENT:
            return { ...state, listComment: action.listComment };
        case 'DISPLAY_COMMENT': {
            let listComment = [ ...state.listComment ];
            listComment[ action.index ].deleted = !listComment[ action.index ].deleted;
            return { ...state, listComment: listComment };
        }
        default:
            return state;
    }
};
