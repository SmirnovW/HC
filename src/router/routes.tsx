import React from 'react';
import { PAGES } from 'constants/pages';
import { PATHS } from './paths';
import { Question } from 'pages/question';
import { Home } from 'pages/home';
import { New } from 'pages/new';
import { Abandoned } from 'pages/abandoned/abandoned';

export const ROUTES = [
    {
        key: PAGES.HOME,
        path: PATHS.HOME,
        render: () => <Home />,
        exact: true,
    },
    {
        key: PAGES.QUESTIONS,
        path: PATHS.QUESTIONS,
        render: () => <Question />,
    },
    {
        key: PAGES.NEW,
        path: PATHS.NEW,
        render: () => <New />,
    },
    {
        key: PAGES.ABANDONED,
        path: PATHS.ABANDONED,
        render: () => <Abandoned />,
    },
];
