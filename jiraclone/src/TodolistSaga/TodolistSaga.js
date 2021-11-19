import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { ADD_TASKLIST_API, DELETE_TASKLIST_API, DONE_TASKLIST_API, GET_TASKLIST_API, REJECT_TASKLIST_API } from '../redux/constants/ToDoListConst';
export default function TodolistSaga() {
    const dispatch = useDispatch();
    const { taskList } = useSelector(state => state.TodolistReducer);
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
        dispatch({
            type: GET_TASKLIST_API,

        });
    };
    useEffect(() => {
        getTaskList();

    }, []);
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
                    <button className="remove" onClick={() => { delTask(item.taskName); }} >
                        <i className="fa fa-trash-alt" />
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
        dispatch({
            type: ADD_TASKLIST_API,
            taskName: state.values.taskName
        });

    };
    const renderTaskCompleted = () => {
        return taskList.filter(item => item.status).map((item, index) => {

            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={() => {
                        delTask(item.taskName);
                    }}>
                        <i className="fa fa-trash-alt" />
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


    const doneTask = (taskName) => {
        dispatch({
            type: DONE_TASKLIST_API,
            taskName: taskName
        });
    };
    const delTask = (taskName) => {
        dispatch({
            type: DELETE_TASKLIST_API,
            taskName: taskName
        });
    };
    const RejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASKLIST_API,
            taskName: taskName
        });
    };
    return (

        <form onSubmit={addTask}>
            <div className='text-center mt-3'>
                <button className='btn btn-success' onClick={() => {
                    dispatch({
                        type: GET_TASKLIST_API
                    });
                }}>dispatch saga </button>
            </div>

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
