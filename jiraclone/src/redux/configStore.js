import { applyMiddleware, combineReducers, createStore } from 'redux';
import TodolistReducer from './reducer/TodolistReducer';
import reduxThunk from 'redux-thunk';
//Middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './Sagas/rootSaga';
import LoadingReducer from './reducer/LoadingReducer';
import ModalReducer from './reducer/ModalReducer';
import HistoryReducer from './reducer/HistoryReducer';
import UserJiraCloneReducer from './reducer/UserJiraCloneReducer';
import ProjectCategoryReducer from './reducer/ProjectCategoryReducer';
import ProjectJiraReducer from './reducer/ProjectJiraReducer';
import DrawerReducer from './reducer/DrawerReducer';
import ProjectEditReducer from './reducer/ProjectEditReducer';
import TaskTypeReducer from './reducer/TaskTypeReducer';
import PriorityReducer from './reducer/PriorityReducer';
import StatusReducer from './reducer/StatusReducer';
import TaskReducer from './reducer/TaskReducer';
import CommentReducer from './reducer/CommentReducer';
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    TodolistReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserJiraCloneReducer,
    ProjectCategoryReducer,
    ProjectJiraReducer,
    DrawerReducer,
    ProjectEditReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    CommentReducer

});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));
//Goi saga
middleWareSaga.run(rootSaga);
export default store;