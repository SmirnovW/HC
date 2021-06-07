import React, { useEffect } from 'react';
import s from 'styled-components';
import { List } from 'components/list';
import { useStores } from 'store';
import { Typography } from 'components/typography';

type Props = {};

const StyledHome = s.div``;

/**
 * Home Component
 */
export const Home: React.FC<Props> = () => {
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
