import { CreatePoll } from 'forms/createPoll';
import React, { useEffect } from 'react';
import { useStores } from 'store';

/**
 * Abandoned Component
 */
export const Abandoned: React.FC = () => {
    const { notificationsStore } = useStores();
    let data = {
        question: '',
        choices: ['', ''],
    };

    const abandonedPollData = localStorage.getItem('abandoned_poll');

    if (abandonedPollData) {
        data = JSON.parse(abandonedPollData);
        localStorage.removeItem('abandoned_poll');
    }

    useEffect(() => {
        notificationsStore.removeNotificationByName('abandoned_poll');
    });

    return <CreatePoll data={data} />;
};
