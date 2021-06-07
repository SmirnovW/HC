import React, { useEffect } from 'react';
import { List } from 'components/list';
import { useStores } from 'store';
import { Typography } from 'components/typography';

/**
 * Home Component
 */
export const Home: React.FC = () => {
    const { pollsStore } = useStores();

    useEffect(() => {
        pollsStore.fetch();
    }, []);

    return (
        <>
            <Typography as="h1" fontSize="large" fontWeight="bold">
                Questions
            </Typography>
            <List />
        </>
    );
};
