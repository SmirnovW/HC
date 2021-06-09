import React from 'react';
import { CreatePoll } from 'forms/createPoll';

/**
 * OfflineMode Component
 */
export const OfflineMode = () => {
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
