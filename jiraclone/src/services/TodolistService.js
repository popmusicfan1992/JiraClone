import Axios from 'axios';
import { DOMAIN } from '../util/constanst/settingSystem';

export class ToDoListService {
    constructor() {

    }
    getTaskAPI = () => {
        return Axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        });
    };
    addTaskAPI = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/AddTask`,
            method: 'POST',
            data: {
                taskName: taskName
            }
        });
    };
    delTaskAPI = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE',
        });
    };
    doneTaskAPI = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT',
        });
    };
    rejectTaskAPI = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT',
        });
    };
}

export const toDoListService = new ToDoListService();