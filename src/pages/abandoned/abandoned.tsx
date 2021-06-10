import { CreatePoll } from 'forms/createPoll';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStores } from 'store';

/**
 * Abandoned Component
 */
export const Abandoned: React.FC = observer(() => {
    const { notificationsStore } = useStores();
    let data = {
        question: '',
        choices: ['', ''],
    };

    const abandonedPollData = window.localStorage.getItem('abandoned_poll');

    if (abandonedPollData) {
        data = JSON.parse(abandonedPollData);
    }

    useEffect(() => {
        notificationsStore.removeNotificationByName('abandoned_poll');
    });

    return <CreatePoll data={data} />;
});
