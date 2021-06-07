import React from 'react';
import s from 'styled-components';

type Props = {
    percentage: number;
    colored?: boolean;
    label?: boolean;
};

const ProgressContainer = s.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0;    
`;

const Wrapper = s.div`
    background: var(--color-neutral-medium);
    overflow: hidden;
    width: 100%;
    height: 8px;
    border-radius: var(--border-radius-small);
`;

const colors = {
    defaultColor: '--color-accent-second',
    medium: '--color-accent-vivid-tangerine',
    small: '--color-accent-wild-watermelon',
    full: '--color-main-cornflower-blue',
};

type ProgressLineProps = {
    percentage: number;
};

const ProgressLine: React.FC<ProgressLineProps> = s.span`
    display: block;
    border-radius: 5px;
    height: 100%;
    background: var(${(props: ProgressLineProps) =>
        getColor(props.percentage)});
    width: ${(props: ProgressLineProps) => props.percentage}%
`;

const getColor = (percentage: number) => {
    if (percentage <= 25) return colors.small;
    if (percentage > 25 && percentage < 44) return colors.medium;
    if (percentage >= 44) return colors.full;
    return colors.defaultColor;
};

/**
 * Progress Component
 */
export const Progress: React.FC<Props> = ({
    percentage,
    colored = false,
    label = false,
}) => (
    <ProgressContainer>
        <Wrapper>
            <ProgressLine percentage={percentage} />
        </Wrapper>
    </ProgressContainer>
);
