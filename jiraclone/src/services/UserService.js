import { baseService } from "./BaseService";

export class UserService extends baseService {
    constructor() {
        super();
    };
    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    };
    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject);
    };
    removeUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`, userProject);
    };
    getUserByProjectId = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`);
    };
    signUpUser = (userSignUp) => {
        return this.post(`Users/signup`, userSignUp);
    };
    editUser = (user) => {
        return this.put(`Users/editUser`, user);
    };
    deleteUser = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`);
    };
}

export const userService = new UserService();