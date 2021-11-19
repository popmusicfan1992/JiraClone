
import { notification } from 'antd';
export const openNotification = (type, message, decripstion) => {
    notification[ type ]({
        message: message,
        description:
            decripstion,
    });
};