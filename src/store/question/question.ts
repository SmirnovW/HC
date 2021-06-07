import { makeAutoObservable, action, observable, runInAction } from 'mobx';
import request, { AxiosResponse } from 'axios';
import { matchPath } from 'react-router';
import { PATHS } from 'router/paths';
import { API_URL } from 'constants/api';

export interface Choices {
    choice: string;
    url: string;
    votes: number;
    id: string;
}

export interface QuestionDetails {
    question: string;
    published_at: string;
    url: string;
    choices: Choices[];
    votesCount: number;
}

export class Question {
    data: QuestionDetails | null = null;

    constructor() {
        makeAutoObservable(this, {
            data: observable,
            fetch: action,
        });
    }

    async fetch(questionId: string) {
        const response: AxiosResponse<QuestionDetails> = await request(
            `${API_URL}/questions/${questionId}`,
            {
                method: 'GET',
            }
        );
        runInAction(() => {
            this.data = {
                ...response.data,
                choices: response.data.choices.map((item) => {
                    const match = matchPath<{
                        questionId: string;
                        choiceId: string;
                    }>(item.url, {
                        path: PATHS.CHOICE,
                        exact: true,
                        strict: false,
                    });

                    return {
                        ...item,
                        id: match?.params.choiceId || '',
                    };
                }),
                votesCount: response.data.choices.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.votes,
                    0
                ),
            };
        });
    }

    async vote(questionId: string, choiceId: string, callback?: () => void) {
        await request(
            `${API_URL}/questions/${questionId}/choices/${choiceId}`,
            {
                method: 'POST',
            }
        );
        runInAction(() => {
            this.fetch(questionId);
            if (callback) {
                callback();
            }
        });
    }
}
