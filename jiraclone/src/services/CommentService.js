import { baseService } from "./BaseService";



class CommentService extends baseService {
    constructor() {
        super();
    };
    getComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`);
    };
    insertComment = (comment) => {
        return this.post(`Comment/insertComment`, comment);
    };
    updateComment = (id, content) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${content}`);
    };
    deletedComment = (id) => {
        return this.delete(`Comment/deleteComment?idComment=${id}`);
    };
}

export const commentService = new CommentService();