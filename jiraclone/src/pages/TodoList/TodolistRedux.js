import React, { useEffect, useState } from 'react';
import './Todolist.css';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAPI, deletaskAPI, doneTaskAPI, getTaskListAPI, rejectTaskAPI } from '../../redux/action/TodolistAction';
export default function TodolistRedux() {

    //Lấy tasklist từ redux về
    const { taskList } = useSelector(state => state.TodolistReducer);
    const dispatch = useDispatch();
    const [ state, setTaskList ] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });

    const getTaskList = () => {
        dispatch(getTaskListAPI());
    };
    const handleChange = (e) => {
        let { value, name } = e.target;


        let newValues = { ...state.values };
        let newErrors = { ...state.errors };
        newValues = { ...state.values, [ name ]: value };
        if (value.trim() === '') {
            newErrors[ name ] = name + ' invalid';
        } else {
            newErrors[ name ] = '';
        }
        setTaskList({
            ...state,
            errors: newErrors,
            values: newValues
        });
    };
    const renderTaskToDo = () => {

        return taskList.filter(item => !item.status).map((item, index) => {

            return <li>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove">
                        <i className="fa fa-trash-alt" onClick={() => { delTask(item.taskName); }} />
                    </button>
                    <button className="complete" onClick={() => { doneTask(item.taskName); }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>;
        });


    };
    const addTask = (e) => {
        e.preventDefault();
        dispatch(addTaskAPI(state.values.taskName));



    };
    const renderTaskCompleted = () => {
        return taskList.filter(item => item.status).map((item, index) => {

            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={() => {
                        this.delTask(item.taskName);
                    }}>
                        <i className="fa fa-trash-alt" onClick={() => { delTask(item.taskName); }} />
                    </button>
                    <button className="complete" onClick={() => {
                        RejectTask(item.taskName);
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>;
        });
    };

    useEffect(() => {
        getTaskList();

    }, []);
    const doneTask = (taskName) => {
        dispatch(doneTaskAPI(taskName));
    };
    const delTask = (taskName) => {
        dispatch(deletaskAPI(taskName));
    };
    const RejectTask = (taskName) => {
        dispatch(rejectTaskAPI(taskName));
    };
    return (
        <form onSubmit={addTask}>
            {/* <div className='text-center mt-3'>
                    <button className='btn btn-success' onClick={() => { this.getTaskList(); }}>Get Task List</button>
                </div> */}

            <div className="card">
                <div className="card__header">
                    <img src="./img/bg.png" />
                </div>
                {/* <h2>hello!</h2> */}
                <div className="card__body">
                    <div className="card__content">
                        <div className="card__title">
                            <h2>My Tasks</h2>
                            <p>September 9,2020</p>
                        </div>
                        <div className="card__add">
                            <input name="taskName" onChange={handleChange} type="text" placeholder="Enter an activity..." />

                            <button id="addItem">
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p className='text text-danger'>{state.errors.taskName}</p>
                        <div className="card__todo">
                            {/* Uncompleted tasks */}
                            <ul className="todo" id="todo">
                                {renderTaskToDo()}
                            </ul>
                            {/* Completed tasks */}
                            <ul className="todo" id="completed">
                                {renderTaskCompleted()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
