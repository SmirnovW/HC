import { configure } from 'mobx';
import React from 'react';
import { Polls } from './polls/polls';
import { Question } from './question/question';
import { NotificationsStore } from 'store/notifications';

configure({ enforceActions: 'observed' });

function createStore() {
    const notificationsStore = new NotificationsStore();

    return {
        pollsStore: new Polls(notificationsStore),
        questionStore: new Question(),
        notificationsStore,
    };
}

export const StoresContext = React.createContext(createStore());

export const useStores = (): AppStoreType => React.useContext(StoresContext);

export type AppStoreType = ReturnType<typeof createStore>;
