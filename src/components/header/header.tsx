import React from 'react';
import s from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'components/button';
import { useHistory } from 'react-router';
import { PATHS } from 'router/paths';
import { Icon } from 'components/icon/icon';

type Props = {};

const StyledHeader = s.header`
    display: flex;
    justify-content: space-between;
	background: var(--color-main-white);
	padding: 20px;
`;

/**
 * Header Component
 */
export const Header: React.FC<Props> = () => {
    const history = useHistory();

    const onClick = () => {
        history.push(PATHS.NEW);
    };

    return (
        <StyledHeader>
            <Link to={PATHS.HOME}>
                <Icon size="large" name="poll" color="accent-main" />
            </Link>
            <Button data-testid="create-poll-link" onClick={onClick}>
                Create new poll
            </Button>
        </StyledHeader>
    );
};
