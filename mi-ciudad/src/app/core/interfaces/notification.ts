export enum NotificationState{
    // ENVIADA A CADA CONTRIBUYENTE
    DELIVERED = "delivered",
    // RECIBIDA POR EL CONTRIBUYENTE PENDIENTE DE QUE EL CONTRIBUYENTE LA LEA
    RECEIVED = "received",
    // NOTIFICACIÓN LEIDA POR EL CONTRIBUYENTE
    READED = "readed",
    CANCELED = "cancelled",
    REJECTED = "rejected",
}

export interface Notification{
    id: number;
    createdAt: string;
    receivedAt: string;
    title: string;
    bubject : string;
    state: NotificationState;
}