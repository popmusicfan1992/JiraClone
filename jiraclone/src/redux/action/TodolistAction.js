import Axios from 'axios';
import { GET_TASK_API } from '../constants/ToDoListConst';

//Action có 2 loại :
//Action thực thi ngay làm thay đổi reducer
//Action phải thực hiện xử lý rồi ms gọi action 1 thực thi ( async action)

export const getTaskListAPI = () => {
    return async dispatch => {
        try {
            let { data, status } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            });

            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                });
            }








        } catch (error) {
            console.log(error);
        }

    };
};
export const addTaskAPI = (taskName) => {
    return async dispatch => {
        if (taskName !== '') {
            try {
                let { data, status } = await Axios({
                    url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                    method: 'POST',
                    data: { taskName: taskName }
                });
                if (status === 200) {
                    dispatch(getTaskListAPI());
                }
            } catch (error) {

            }

            // promise.then((result) => {

            //     dispatch(getTaskListAPI());
            // });
            // promise.catch((err) => {

            // });
        } else {

            return;
        }
    };
};
export const deletaskAPI = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });
        promise.then((res) => {

            dispatch(getTaskListAPI());
        });
        promise.catch((err) => {


        });
    };
};
export const doneTaskAPI = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListAPI());
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    };
};
export const rejectTaskAPI = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then((res) => {
            alert(res.data);
            dispatch(getTaskListAPI());
        });
        promise.catch((err) => {
            alert(err.response.data);

        });
    };
};
