import React from 'react';
import s from 'styled-components';
import { Loader } from '../loader/loader';

type Props = {
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    type?: 'submit' | 'reset' | 'button';
    loading?: boolean;
    color?: 'accent' | 'second' | 'disabled';
    size?: 'tiny' | 'small' | 'medium' | 'big';
    value?: string;
    disabled?: boolean;
};

const colors = {
    accent: `
        background-color: var(--color-accent-main);
        color: var(--color-main-white);
    `,
    second: `
        background-color: var(--color-accent-second);
        color: var(--color-main-white);
    `,
    disabled: `
        background-color: var(--color-dark-light);
        color: var(--color-dark-medium);
    `,
};

const StyledButton = s.button`
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 20px;
    height: 41px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    border: none;
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-${(props: Props) => props.size});
    ${(props: Props) =>
        props.disabled && !props.loading
            ? colors['disabled']
            : colors[props?.color || 'accent']}
`;

const StyledLoader = s.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
        ${(props: Props) => colors[props?.color || 'accent']}
`;

/**
 * Button Component
 */
export const Button: React.FC<Props> = ({
    children,
    onClick,
    type = 'button',
    loading = false,
    color = 'accent',
    size = 'medium',
    value = '',
    disabled = false,
}) => {
    return (
        <StyledButton
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            value={value}
            color={color}
            size={size}
        >
            {loading && (
                <StyledLoader>
                    <Loader />
                </StyledLoader>
            )}
            {children}
        </StyledButton>
    );
};
