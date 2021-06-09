import { makeAutoObservable, action, observable, runInAction } from 'mobx';
import request, { AxiosResponse } from 'axios';
import { QuestionDetails } from 'store/question/question';
import { mapErrors } from 'store/utils/mapErrors';
import { RequestStatus } from 'store/enums';
import { NotificationsStore } from 'store/notifications';
import { API_URL } from 'constants/api';

export class Polls {
    items: QuestionDetails[] = [];
    errors: Record<string, string> = {};
    status: RequestStatus = RequestStatus.INITIAL;

    notificationsStore = {} as NotificationsStore;

    constructor(notificationsStore: NotificationsStore) {
        makeAutoObservable(this, {
            items: observable,
            errors: observable,
            fetch: action,
            setErrors: action,
        });
        this.notificationsStore = notificationsStore;
    }

    async create(
        data: { question: string; choices: string[] },
        callback?: (response: AxiosResponse<QuestionDetails>) => void
    ) {
        try {
            this.status = RequestStatus.PENDING;
            const response: AxiosResponse<QuestionDetails> = await request(
                `${API_URL}/questions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify(data),
                }
            );
            runInAction(() => {
                this.status = RequestStatus.FULFILLED;
                if (callback) {
                    callback(response);
                }
            });
        } catch (error) {
            runInAction(() => {
                this.status = RequestStatus.REJECTED;
                if (error?.response?.data.details.errors) {
                    this.errors = mapErrors(
                        error?.response?.data.details.errors
                    );
                }
            });
        }
    }

    async fetch() {
        const response: AxiosResponse<QuestionDetails[]> = await request(
            `${API_URL}/questions`,
            {
                method: 'GET',
            }
        );
        runInAction(() => {
            this.items = response.data.map((item) => {
                return {
                    ...item,
                    votesCount: item.choices.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.votes,
                        0
                    ),
                };
            });
        });
    }

    setErrors(errors: Record<string, any>) {
        this.errors = errors;
    }
}
