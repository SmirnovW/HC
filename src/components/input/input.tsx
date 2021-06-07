import React, {
    ChangeEvent,
    FocusEvent,
    HTMLAttributes,
    MutableRefObject,
} from 'react';
import s from 'styled-components';
import { Typography, Props as TypographyProps } from 'components/typography';

interface Props extends HTMLAttributes<HTMLInputElement> {
    autoFocus?: boolean;
    autoComplete?: boolean | string;
    labelColor?: string;
    align?: 'left' | 'center' | 'right';
    ref?: MutableRefObject<null | HTMLInputElement>;
    name?: string;
    label?: string;
    value: React.ReactText;
    type?: string;
    error?: string;
    placeholder?: string;
    required?: boolean;
    fill?: boolean;
    id?: string;
    className?: string;
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

export const Label: React.FC<TypographyProps> = s(Typography)`
    margin-bottom: 10px !important;
    display: inline-block;
`;

const Container = s.div`
    position: relative;
`;

const Error = s.div`
    font-size: var(--font-size-small);
    display: inline-block;
    position: absolute;
    bottom: calc(0px - 20px);
    left: 0;
    color: var(--color-accent-error);
`;

const StyledInput = s.input`
    background: var(--color-main-white);
    box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 12px 10px 12px;
    color: var(--color-main-dark);
    width: 100%;
    font-size: var(--font-size-medium);
    font-family: 'Noto Sans', sans-serif;
    box-sizing: border-box;
    border: 1px solid ${(props: Props) =>
        props.error ? 'var(--color-accent-error)' : 'transparent'};
`;

/**
 * Input Component
 */
export const Input: React.FC<Props> = ({
    align = 'left',
    labelColor = 'main-dark',
    autoFocus = false,
    autoComplete = false,
    value,
    onChange = () => {},
    onFocus = () => {},
    type = 'text',
    placeholder = '',
    name = '',
    error = '',
    required = false,
    fill = false,
    id = '',
    label = '',
    className = '',
    ...restProps
}) => {
    return (
        <Container className={className}>
            {label && (
                <Label
                    as="label"
                    id={id}
                    fontWeight="bold"
                    color="neutral-dark"
                    fontSize="medium"
                >
                    {label}
                </Label>
            )}
            <StyledInput
                id={id}
                required={required}
                name={name}
                onChange={onChange}
                onFocus={onFocus}
                placeholder={placeholder}
                value={value}
                type={type}
                autoFocus={autoFocus}
                autoComplete={autoComplete ? 'on' : 'off'}
                error={error}
                {...restProps}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
};
