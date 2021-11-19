import { USER_SIGNIN_API_JIRACLONE } from "../constants/JiraClone/JiraCloneConstant";
//action saga gửi đăng nhập
export const jiraCloneSigninAction = (email, password) => {
    return {
        type: USER_SIGNIN_API_JIRACLONE,
        userName: {
            email: email,
            password: password
        }
    };
};

//Action get all project category saga