import { baseService } from "./BaseService";



export class TaskService extends baseService {
    constructor() {
        super();
    };
    createTask = (task) => {
        return this.post(`Project/createTask`, task);
    };
    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`);
    };
    updateStatusTask = (taskStatusUpdate) => {
        return this.put(`Project/updateStatus`, taskStatusUpdate);

    };
    updateTask = (taskUpdate) => {
        return this.post(`Project/updateTask`, taskUpdate);
    };
    removeTask = (taskId) => {
        return this.delete(`Project/removeTask?taskId=${taskId}`);
    };
}

export const taskService = new TaskService();