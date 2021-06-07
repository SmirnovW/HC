import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useNetworkState } from 'react-use';

import './App.css';
import './css/variables.css';

import { Router } from 'router/router';
import { Header } from 'components/header';
import { CreatePoll } from 'forms/createPoll';
import { NotificationsContainer } from 'components/notificationsContainer';
import { useStores } from 'store';
import { EnumsNotificationTypes } from 'store/notifications/enums';

const OfflineMode = () => {
    return (
        <div>
            <p>Oops, it seems the Vodafone doesn't work... Again... 😑</p>
            <p>
                But you can create a poll and it would be added after the
                Vodafone connection will work again... 😅
            </p>
            <CreatePoll />
        </div>
    );
};

function App() {
    const { notificationsStore } = useStores();
    const state = useNetworkState();

    useEffect(() => {
        if (localStorage.getItem('abandoned_poll')) {
            notificationsStore.addNotification({
                name: 'abandoned_poll',
                title: 'You have abandoned poll.',
                type: EnumsNotificationTypes.ABANDONED,
                expire: 0,
            });
        }
    });

    return (
        <BrowserRouter>
            <Header />
            <main className="app">
                {state.online ? <Router /> : <OfflineMode />}
            </main>
            <NotificationsContainer />
        </BrowserRouter>
    );
}

export default App;
