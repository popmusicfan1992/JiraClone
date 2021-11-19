import { baseService } from "./BaseService";



export class PriorityService extends baseService {
    constructor() {
        super();
    };
    getAllPriority = () => {
        return this.get(`Priority/getAll`);
    };
}

export const priorityService = new PriorityService();