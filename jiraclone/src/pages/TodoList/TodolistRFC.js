import React, { useEffect, useState } from 'react';
import './Todolist.css';
import Axios from 'axios';
export default function TodolistRFC() {

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
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((result) => {

            setTaskList({
                ...state,
                taskList: result.data
            });


        });

        promise.catch((err) => {
            console.log(err);
        });
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

        return state.taskList.filter(item => !item.status).map((item, index) => {

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

        if (state.errors.taskName == '') {
            let promise = Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: state.values.taskName }
            });
            promise.then((result) => {

                getTaskList();
            });
            promise.catch((err) => {

            });
        } else {
            alert('faild');
            return;
        }


    };
    const renderTaskCompleted = () => {
        return state.taskList.filter(item => item.status).map((item, index) => {

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
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            getTaskList();
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    };
    const delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });
        promise.then((res) => {
            alert(res.data);
            getTaskList();
        });
        promise.catch((err) => {
            alert(err.response.data);

        });
    };
    const RejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then((res) => {
            alert(res.data);
            getTaskList();
        });
        promise.catch((err) => {
            alert(err.response.data);

        });
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
