import { USER_LOGIN } from "../../util/constanst/settingSystem";
import { GET_LIST_USER, GET_USER, USLOGIN } from "../constants/JiraClone/JiraCloneConstant";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
    userLogin: usLogin,
    userSearch: [],
    arrUserById: [],
    userList: [],
    userEdit: {}
};

export default (state = initialState, action) => {
    switch (action.type) {

        case USLOGIN:
            state.userLogin = action.userLogin;
            return { ...state };
        case GET_USER: {

            return { ...state, arrUserById: action.arrUserById, userSearch: action.userSearch };
        }
        case GET_LIST_USER: {
            return { ...state, userList: action.userList };
        }
        case 'GET_EDIT_USER': {
            return { ...state, userEdit: action.userEdit };
        }


        default:
            return state;
    }
};
