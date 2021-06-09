import React from 'react';
import s from 'styled-components';

import * as commonIcons from './svg/common/index';

interface Icons {
    [key: string]: any;
}

interface Sizes {
    [name: string]: number | string;
}

export const icons: Icons = {
    ...commonIcons,
};

export type Props = {
    /**
     * Icon name.
     */
    name?: string;
    /**
     * Icon size
     */
    size?: 'responsive' | 'xsmall' | 'small' | 'medium' | 'large';
    color?: string;
    className?: string;
};

const SIZE_RESPONSIVE = 'responsive';
const SIZE_EXTRA_SMALL = 'xsmall';
const SIZE_SMALL = 'small';
const SIZE_MEDIUM = 'medium';
const SIZE_LARGE = 'large';

/* Sizes values */
const SIZES: Sizes = {
    [SIZE_EXTRA_SMALL]: 13,
    [SIZE_SMALL]: 17,
    [SIZE_MEDIUM]: 22,
    [SIZE_LARGE]: 34,
    [SIZE_RESPONSIVE]: '100%',
};

/**
 * Icon component
 */
const BaseIcon: React.FC<Props> = ({
    name = '',
    size = SIZE_RESPONSIVE,
    className,
}) => {
    const sizeValue = SIZES[size] || size;
    const IconComponent = icons[name];

    if (typeof IconComponent === 'undefined') {
        console.error('Requested icon does not exist');
        return null;
    }

    return (
        <IconComponent
            width={sizeValue}
            height={sizeValue}
            className={className}
        />
    );
};

export const Icon: React.FC<Props> = s(BaseIcon)`
    fill: var(--color-${(props: Props) =>
        props.color || 'dark-medium'});            
`;
