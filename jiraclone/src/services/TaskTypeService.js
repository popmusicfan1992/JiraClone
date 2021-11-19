import { baseService } from "./BaseService";



export class TaskTypeService extends baseService {
    constructor() {
        super();
    };
    getAllTaskType = () => {
        return this.get(`TaskType/getAll`);
    };
}

export const taskTypeService = new TaskTypeService();