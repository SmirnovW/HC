import React from 'react';
import s from 'styled-components';

interface Props {
    className?: string;
}

const StyledCard = s.div`
    width: 100%;
    position: relative;
	padding: 20px;
    display: flex;
    flex-direction: column;
	background: var(--color-main-white);
    box-sizing: border-box;
    box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    border-radius: var(--border-radius-small);
`;

/**
 * Card Component
 */
export const Card: React.FC<Props> = ({
    className = '',
    children,
    ...restProps
}) => {
    return (
        <StyledCard className={className} {...restProps}>
            {children}
        </StyledCard>
    );
};
