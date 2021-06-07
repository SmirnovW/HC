import React from 'react';
import s from 'styled-components';
import { Card } from 'components/card/card';

const PlaceholderContainer = s(Card)`
    * {
        margin-bottom: 15px;
    }

    *:last-child {
         margin-bottom: 0;
    }

    &:before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 50%;
        z-index: 1;
        width: 500%;
        margin-left: -250%;
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 46%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0) 54%) 50% 50%;
        animation: phAnimation 0.8s linear infinite;
        content: " ";
        pointer-events: none;
    }
    
    @keyframes phAnimation {
        0% {
            transform: translate3d(-30%, 0, 0);
        }
    
        100% {
            transform: translate3d(30%, 0, 0);
        }
    }
`;

const PlaceholderLine = s.div`
    width: 50%;
    height: 20px;
    background-color: var(--color-neutral-light);
`;

const PlaceholderSmallLine = s.div`
    width: 35%;
    height: 15px;
    background-color: var(--color-neutral-light);
`;
/**
 * Placeholder Component
 */
export const Placeholder: React.FC = () => {
    return (
        <PlaceholderContainer>
            <PlaceholderLine />
            <PlaceholderSmallLine />
        </PlaceholderContainer>
    );
};
