import { useApi } from "../hooks/useApi";
import { CreateNotificationInterface } from "../interfaces/notification.interface";

const api = useApi()


export async function createandPublishNotification(notification : CreateNotificationInterface) {
    try {
        const { data } = await api.post('notifications/publish', notification);
        return data
    } catch (error: any) {
        throw new Error(error);
    }
}