import apiClient from "./apiClient";
import { CreateNotificationInterface } from "../interfaces/notification.interface";

export async function createandPublishNotification(notification : CreateNotificationInterface) {
    const { data } = await apiClient.post('notifications/publish', notification);
    return data
}