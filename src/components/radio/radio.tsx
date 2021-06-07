import React, { ChangeEvent } from 'react';
import s from 'styled-components';

import { Typography } from 'components/typography';
import { Icon } from 'components/icon/icon';

type Props = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    label?: string;
    value?: string;
    name?: string;
    size?: 'medium' | 'big';
    className?: string;
};

const StyledLabel = s.label`
    cursor: pointer;
    display: flex;
    align-items: center;

    input {
        display: none;
    }

    input:checked + .radio-control {
        background-color: var(--color-accent-main);
        border: 2px solid var(--color-accent-main);
    }
`;

const StyledRadioControl = s.span`
    display: block;
    z-index: 2;
    position: relative;
    width: 23px;
    height: 23px;
    color: var(--color-main-white);
    border: 2px solid var(--color-main-medium);
    border-radius: var(--border-radius-large);
    box-sizing: border-box;
    padding: 3px;
`;

const StyledInputContainer = s.span`
    margin-right: 8px;
`;

/**
 * CheckBox Component
 */
export const Radio: React.FC<Props> = ({
    id,
    name,
    onChange,
    label,
    value,
}) => {
    return (
        <StyledLabel htmlFor={id}>
            <StyledInputContainer>
                <input
                    onChange={onChange}
                    type="radio"
                    name={name}
                    value={value}
                    id={id}
                />
                <StyledRadioControl className="radio-control">
                    <Icon name="check" size="xsmall" color="main-white" />
                </StyledRadioControl>
            </StyledInputContainer>
            {label && (
                <Typography
                    color="main-main-dark"
                    fontWeight="bold"
                    fontSize="medium"
                >
                    {label}
                </Typography>
            )}
        </StyledLabel>
    );
};
