
import Axios from 'axios';
import { DOMAIN_JIRACLONE, TOKEN } from '../util/constanst/settingSystem';


export const jiraCloneService = {
    signinJiraClone: (userlogin) => {

        return Axios({
            url: `${DOMAIN_JIRACLONE}/users/signin`,
            method: 'POST',
            data: userlogin
        });
    },
    getAllProjectCategoryService: () => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/ProjectCategory`,
            method: 'GET'
        });
    },
    createProjectService: (newProject) => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/Project/createProject`,
            method: 'POST',
            data: newProject
        });
    },
    createProjectAuthorizationService: (newProject) => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    },
    GetListProjectService: () => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/Project/getAllProject`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    },
    updateProjectService: (projectUpdate) => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'PUT',
            data: projectUpdate,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    }
};