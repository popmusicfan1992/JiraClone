import { CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_ASSIGNESS } from "../constants/JiraClone/JiraCloneConstant";

const initialState = {
    taskDetailModal: {
        "priorityTask": {
            "priorityId": 2,
            "priority": "Medium"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 379,
                "avatar": "https://ui-avatars.com/api/?name=string123",
                "name": "string123",
                "alias": "string123"
            },
            {
                "id": 328,
                "avatar": "https://ui-avatars.com/api/?name=123456",
                "name": "123456",
                "alias": "123456"
            }
        ],
        "lstComment": [],
        "taskId": 1428,
        "taskName": "asd",
        "alias": "asd",
        "description": "",
        "statusId": "1",
        "originalEstimate": 3,
        "timeTrackingSpent": 3,
        "timeTrackingRemaining": 3,
        "typeId": 1,
        "priorityId": 2,
        "projectId": 1666
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModal: action.taskDetailModal };
        }
            break;
        case CHANGE_TASK_MODAL: {
            let { value, name } = action;

            return { ...state, taskDetailModal: { ...state.taskDetailModal, [ name ]: value } };
        }
            break;
        case 'ADD_ASSIGNESS': {
            state.taskDetailModal.assigness = [ ...state.taskDetailModal.assigness, action.userSelected ];
            return { ...state };
        }
            break;
        case REMOVE_ASSIGNESS: {
            state.taskDetailModal.assigness = [ ...state.taskDetailModal.assigness.filter(user => user.id != action.userId) ];
            return { ...state };
        }
            break;


        default:
            return state;
    }
};
