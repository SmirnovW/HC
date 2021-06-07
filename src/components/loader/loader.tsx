import React from 'react';
import s from 'styled-components';

const StyledLoader = s.div`
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
    
    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 34px;
        height: 34px;
        margin: 4px;
        border: 5px solid var(--color-main-white);
        border-radius: 50%;
        animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: var(--color-main-white) transparent transparent transparent;
    }
    
    div:nth-child(1) {
        animation-delay: -0.45s;
    }
    
    div:nth-child(2) {
        animation-delay: -0.3s;
    }

    div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

/**
 * Loader Component
 */
export const Loader: React.FC = React.memo(() => {
    return (
        <StyledLoader>
            <div />
            <div />
            <div />
            <div />
        </StyledLoader>
    );
});
