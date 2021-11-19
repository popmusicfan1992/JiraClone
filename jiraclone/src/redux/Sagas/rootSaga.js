import { fork, take, takeLatest, put, call, all } from 'redux-saga/effects';

import * as TodolistSaga from './TodolistSaga';
import * as JiraCloneSaga from './JiraCloneSaga/UserJiraSaga';
import * as ProjectCategorySaGa from './JiraCloneSaga/ProjectCategory';
import * as CreateProjectSaga from './JiraCloneSaga/ProjectSaga';
import * as TaskTypeSaga from './JiraCloneSaga/TaskTypeSaga';
import * as PrioritySaga from './JiraCloneSaga/PrioritySaga';
import * as TaskSaga from './JiraCloneSaga/TaskSaga';
import * as StatusSaga from './JiraCloneSaga/StatusSaga';
import * as CommentSaga from './JiraCloneSaga/CommentSaga';

export function* rootSaga() {
    yield all([
        TodolistSaga.theoDoiActionGetTaskAPI(),
        TodolistSaga.theoDoiActionAddTaskAPI(),
        TodolistSaga.theoDoiActionDelTaskAPI(),
        TodolistSaga.theoDoiActionDoneTaskAPI(),
        TodolistSaga.theoDoiActionRejectTaskAPI(),

        //Nghiep vu jira
        JiraCloneSaga.theoDoiSignIn(),
        ProjectCategorySaGa.theoDoigetAllProjectCategory(),
        CreateProjectSaga.theoDoiCreateProject(),
        CreateProjectSaga.theoDoiGetListProject(),
        CreateProjectSaga.theoDoiUpdateProject(),
        CreateProjectSaga.theoDoiDeleteProject(),
        JiraCloneSaga.theoDoiGetUser(),
        JiraCloneSaga.theoDoiaddUserProjectSaga(),
        JiraCloneSaga.theoDoiremoveUserFromProject(),
        CreateProjectSaga.theoDoiGetprojectDetails(),
        CreateProjectSaga.theoDoiGetAllProjectSaga(),
        TaskTypeSaga.theodoiGetAllTaskTypeSaga(),
        PrioritySaga.theodoiGetAllPrioritySaga(),

        TaskSaga.theodoiCreateTaskSaga(),
        StatusSaga.theodoigetAllStatusSaga(),
        JiraCloneSaga.theoDoigetUserByProjectIdSaga(),
        TaskSaga.theodoigetTaskDetailSaga(),
        TaskSaga.theodoiupdateTaskStatusSaga(),
        TaskSaga.theodoiHandleChanePostAPIUpdateTaskSaga(),
        TaskSaga.theodoiRemoveTaskStatusSaga(),
        CommentSaga.theodoigetCommentSaga(),
        CommentSaga.theodoiinsertCommentSaga(),
        CommentSaga.theodoiupdateCommentSaga(),
        CommentSaga.theodoideletedCommentSaga(),
        JiraCloneSaga.theoDoisignUpSaga(),
        JiraCloneSaga.theoDoigetListUser(),
        JiraCloneSaga.theoDoieditUserSaga(),
        JiraCloneSaga.theoDoiDeleteUserSaga(),
        JiraCloneSaga.theoDoiLogOutSaga()





    ]);
}