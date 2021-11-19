import { baseService } from "./BaseService";



export class StatusService extends baseService {
    constructor() {
        super();
    };
    getStatus = () => {
        return this.get(`Status/getAll`);
    };
}

export const statusService = new StatusService();