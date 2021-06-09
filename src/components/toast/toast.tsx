import React from 'react';
import s from 'styled-components';
import { Link } from 'react-router-dom';
import { EnumsNotificationTypes } from 'store/notifications/enums';

import { Card } from 'components/card/card';
import { Icon } from 'components/icon/icon';
import { Typography } from 'components/typography/typography';
import { PATHS } from 'router/paths';

type Props = {
    title: string;
    type: EnumsNotificationTypes;
};

const colors = {
    [EnumsNotificationTypes.ABANDONED]: 'accent-edit',
    [EnumsNotificationTypes.SUCCESS]: 'accent-success',
    [EnumsNotificationTypes.ERROR]: 'accent-error-light',
    [EnumsNotificationTypes.ATTENTION]: 'accent-edit',
};

const iconColors = {
    [EnumsNotificationTypes.ABANDONED]: 'accent-contrast',
    [EnumsNotificationTypes.SUCCESS]: 'accent-focus',
    [EnumsNotificationTypes.ERROR]: 'accent-error',
    [EnumsNotificationTypes.ATTENTION]: 'accent-contrast',
};

const icons = {
    [EnumsNotificationTypes.ABANDONED]: 'attention',
    [EnumsNotificationTypes.SUCCESS]: 'check',
    [EnumsNotificationTypes.ERROR]: 'error',
    [EnumsNotificationTypes.ATTENTION]: 'attention',
};

type ToastContainerProps = {
    type: EnumsNotificationTypes;
};

const ToastContainer = s(Card)`
    flex-direction: row;
    background: var(--color-${(props: ToastContainerProps) =>
        colors[props.type]});
`;

const IconWrapper = s.span`
    display: flex;
    align-items: center;
    margin-right: 15px;
`;

/**
 * Toast Component
 */
export const Toast: React.FC<Props> = (props) => {
    return (
        <ToastContainer type={props.type}>
            <IconWrapper>
                <Icon
                    name={icons[props.type]}
                    size="small"
                    color={iconColors[props.type]}
                />
            </IconWrapper>
            <Typography as="span" color="main-dark-light">
                {props.title}{' '}
                {props.type === EnumsNotificationTypes.ABANDONED && (
                    <Link to={PATHS.ABANDONED}>You can review it here</Link>
                )}
            </Typography>
        </ToastContainer>
    );
};
