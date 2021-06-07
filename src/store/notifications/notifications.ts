import { action, makeAutoObservable, observable } from 'mobx';
import { InterfaceNotification, InterfaceNotificationsStore } from './types';

export class NotificationsStore implements InterfaceNotificationsStore {
    notifications: InterfaceNotification[] = [];

    constructor() {
        makeAutoObservable(this, {
            notifications: observable,
            addNotification: action,
            removeNotification: action,
        });
    }

    addNotification(notification: InterfaceNotification) {
        console.log('notification');
        this.notifications.push(notification);

        if (notification.expire !== 0) {
            setTimeout(
                () => {
                    this.removeNotification();
                },
                notification?.expire ? notification.expire : 3000
            );
        }
    }

    removeNotificationByName(name: string) {
        this.notifications = this.notifications.filter(
            (notification) => notification.name !== name
        );
    }

    removeNotification() {
        this.notifications = this.notifications.slice(
            1,
            this.notifications.length
        );
    }
}
