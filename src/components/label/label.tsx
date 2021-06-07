import React from 'react';
import s from 'styled-components';

type Props = {
    className?: string;
};

const StyledLabel = s.div`
    padding: 5px;
    background: var(--color-main-white);
    border-radius: var(--border-radius-large);
    border: 2px solid var(--color-accent-main);
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-bold);
    color: var(--color-dark-medium);
`;

/**
 * Label Component
 */
export const Label: React.FC<Props> = ({ children, className = '' }) => {
    return <StyledLabel className={className}>{children}</StyledLabel>;
};
