
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Header from './Components/Home/Header/Header';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import TodolistRCC from './pages/TodoList/TodolistRCC';
import TodolistRFC from './pages/TodoList/TodolistRFC';
import TodolistRedux from './pages/TodoList/TodolistRedux';
import TodolistSaga from './TodolistSaga/TodolistSaga';
import LoadingComponent from './Components/LoadingComponent/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Modal from './Components/Modal/Modal';
import Register from './pages/Register/Register';
import { UserLoginTemplate } from './templates/JiraCloneTemplate/UserLoginTemplate';
import LoginJira from './pages/JiraClone/LoginJira/LoginJira';
import { useDispatch } from 'react-redux';
import { JiraCloneTemplate } from './templates/JiraCloneTemplate/JiraCloneTemplate';
import IndexJiraClone from './pages/JiraClone/ProjectJira/IndexJiraClone';
import CreateProjectJira from './pages/JiraClone/CreateProjectJira/CreateProjectJira';
import ProjectManagementJira from './pages/JiraClone/ProjectManagementJira/ProjectManagementJira';
import ModalCreate from './Components/JiraCloneComponent/ModalJira/ModalDrawerCreate';
import DemoDragDrop from './pages/DemoDragDrop/DemoDragDrop';
import LibDragDrop from './pages/DemoDragDrop/LibDragDrop';
import signUpJira from './pages/JiraClone/SignUpJira/signUpJira';
import UserJiraManagement from './pages/UserJiraManagement/UserJiraManagement';
function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch({ type: 'ADD_HISTORY', history: history });
  return (
    <>
      <ModalCreate />
      <Modal />
      <LoadingComponent />
      <Switch>

        <UserLoginTemplate exact path='/login' Component={LoginJira} />
        <JiraCloneTemplate exact path='/projectdetails' Component={IndexJiraClone} />
        <JiraCloneTemplate exact path='/createproject' Component={CreateProjectJira} />
        <JiraCloneTemplate exact path='/projectmanagament' Component={ProjectManagementJira} />
        <JiraCloneTemplate exact path='/projectdetails/:projectId' Component={IndexJiraClone} />
        <JiraCloneTemplate exact path='/usermanagement' Component={UserJiraManagement} />
        <UserLoginTemplate exact path='/' Component={LoginJira} />

        <UserLoginTemplate exact path='/signup' Component={signUpJira} />



      </Switch>


    </>
  );
}

export default App;
