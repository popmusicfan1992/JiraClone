import Axios from 'axios';
import { DOMAIN_JIRACLONE, TOKEN } from '../util/constanst/settingSystem';
export class baseService {
    //put json ve phia backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    };
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    };
    get = (url) => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    };
    delete = (url) => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/${url}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    };
    getNoToken = (url) => {
        return Axios({
            url: `${DOMAIN_JIRACLONE}/${url}`,
            method: 'GET',

        });
    };

}