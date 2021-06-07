import React, { AllHTMLAttributes } from 'react';
import s from 'styled-components';

export interface Props
    extends Omit<AllHTMLAttributes<HTMLElement>, 'color' | 'as'> {
    children: React.ReactNode;
    className?: string;
    as?: string;
    fontWeight?: 'bold' | 'regular';
    fontSize?: 'extra-large' | 'large' | 'big' | 'medium' | 'small' | 'tiny';
    color?: any; // TODO
    transform?: 'none' | 'uppercase' | 'capitalize';
    htmlFor?: string;
    value?: string | number;
}

/**
 * Typography Component
 */
export const BaseTypography: React.FC<Props> = (props) => {
    const { children, as = 'div', ...restProps } = props;

    return React.createElement(
        as,
        {
            ...restProps,
            style: {
                ...props.style,
            },
        },
        children
    );
};

export const Typography: React.FC<Props> = s(BaseTypography)`
    font-size: var(--font-size-${(props: Props) => props.fontSize || 'medium'});
    font-weight: var(--font-weight-${(props: Props) =>
        props.fontWeight || 'regular'});
    color: var(--color-${(props: Props) => props.color || 'dark-medium'});
    text-decoration: ${(props: Props) => props.transform || 'none'};
`;
