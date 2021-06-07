import { EnumsNotificationTypes } from './enums';

export interface InterfaceNotification {
    name: string;
    title: string;
    type: EnumsNotificationTypes;
    expire?: number;
}

export interface InterfaceNotificationsStore {
    notifications: InterfaceNotification[];
}
