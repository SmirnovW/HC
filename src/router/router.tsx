import React from 'react';
import { Route, RouteProps, Switch } from 'react-router';
import s from 'styled-components';
import { ROUTES } from './routes';
import { observer } from 'mobx-react';

type Props = {};

const StyledWrapper = s.div`
    @media (min-width: 768px) {
        width: 550px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

/**
 * Router Component
 */
export const Router: React.FC<Props> = observer(() => {
    return (
        <StyledWrapper>
            <Switch>
                {ROUTES.map((props: RouteProps) => {
                    return <Route {...props} />;
                })}
            </Switch>
        </StyledWrapper>
    );
});
