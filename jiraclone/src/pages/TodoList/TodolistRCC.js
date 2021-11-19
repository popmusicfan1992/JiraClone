import React, { Component } from 'react';
import Axios from 'axios';
import './Todolist.css';
export default class TodolistRCC extends Component {
    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    };
    getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((result) => {
            this.setState({
                taskList: result.data
            });



        });

        promise.catch((err) => {
            console.log(err);
        });
    };
    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {

            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={() => {
                        this.delTask(item.taskName);
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" onClick={() => {
                        this.doneTask(item.taskName);
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>;
        });
    };
    renderTaskCompleted = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {

            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={() => {
                        this.delTask(item.taskName);
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" onClick={() => {
                        this.RejectTask(item.taskName);
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>;
        });
    };
    componentDidMount() {
        this.getTaskList();
    }
    addTask = (e) => {
        e.preventDefault();
        console.log(this.state.errors.taskName);
        if (this.state.errors.taskName == '') {
            let promise = Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: this.state.values.taskName }
            });
            promise.then((result) => {

                this.getTaskList();
            });
            promise.catch((err) => {

            });
        } else {
            alert('faild');
            return;
        }


    };
    handleChange = (e) => {
        let { value, name } = e.target;


        let newValues = { ...this.state.values };
        let newErrors = { ...this.state.errors };
        newValues = { ...this.state.values, [ name ]: value };
        if (value.trim() === '') {
            newErrors[ name ] = name + ' invalid';
        } else {
            newErrors[ name ] = '';
        }
        this.setState({
            errors: newErrors,
            values: newValues
        });
    };
    doneTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    };
    delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });
        promise.then((res) => {
            alert(res.data);
            this.getTaskList();
        });
        promise.catch((err) => {
            alert(err.response.data);

        });
    };
    RejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then((res) => {
            alert(res.data);
            this.getTaskList();
        });
        promise.catch((err) => {
            alert(err.response.data);

        });
    };
    render() {
        return (
            <form onSubmit={this.addTask}>
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
                                <input name="taskName" onChange={this.handleChange} type="text" placeholder="Enter an activity..." />

                                <button id="addItem">
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p className='text text-danger'>{this.state.errors.taskName}</p>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskCompleted()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
