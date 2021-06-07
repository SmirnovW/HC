import React from 'react';
import s from 'styled-components';
import { observer } from 'mobx-react';

import { useStores } from 'store';
import { Toast } from 'components/toast/toast';

type Props = {};

const Container = s.div`
    width: 400px;
    position: fixed;
    right: 20px;
    bottom: 30px;
    z-index: 15;
    padding: 10px;
    box-sizing: border-box;

    & > * {
        margin-bottom: 15px;
    }
    
    @media (min-width: 768px) {
        width: 400px;
    }

    @media (max-width: 768px) {
        width: 100%;
        right: 0;
    }
`;

/**
 * NotificationsContainer Component
 */
export const NotificationsContainer: React.FC<Props> = observer(() => {
    const { notificationsStore } = useStores();

    return notificationsStore.notifications.length > 0 ? (
        <Container>
            {notificationsStore.notifications.map((notification) => (
                <Toast title={notification.title} type={notification.type} />
            ))}
        </Container>
    ) : null;
});
