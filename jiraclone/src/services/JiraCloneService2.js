import { baseService } from "./BaseService";

export class jiraCloneService2 extends baseService {
    constructor() {
        super();
    };
    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectId=${id}`);
    };
    getProjectDetails = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`);
    };
    getAllProject = () => {
        return this.get(`Project/getAllProject?keyword=""`);
    };
}

export const jiraCloneProjectService = new jiraCloneService2();