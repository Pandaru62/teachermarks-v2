export default interface NotificationInterface {
    id: number,
    title: string,
    message: string,
    created_at: Date | string,
    updated_at: Date | string
}

export type CreateNotificationInterface = Pick<NotificationInterface, "title" | "message">;

export type EditNotificationInterface = Pick<NotificationInterface, "title" | "message">;