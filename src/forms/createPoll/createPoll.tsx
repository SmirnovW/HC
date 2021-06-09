import React, { ChangeEvent, useState } from 'react';
import s from 'styled-components';
import { useHistory } from 'react-router';
import { useStores } from 'store';
import { Typography } from 'components/typography';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { observer } from 'mobx-react-lite';
import { useNetworkState } from 'react-use';
import { EnumsNotificationTypes } from 'store/notifications/enums';

type Props = {
    data?: {
        question: string;
        choices: string[];
    };
};

const StyledInput = s(Input)`
    margin-bottom: 25px;
`;

const Divider = s.hr`
    margin: 10px 0;
    height: 1px;
    border: none;
    background: var(--color-neutral-medium);
`;

/**
 * CreatePoll Component
 */
export const CreatePoll: React.FC<Props> = observer(({ data }) => {
    const state = useNetworkState();
    const history = useHistory();
    const { pollsStore, notificationsStore } = useStores();
    const [form, setForm] = useState(
        data
            ? data
            : {
                  question: '',
                  choices: ['', ''],
              }
    );

    const setQuestion = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, question: event.target.value });
    };

    const setChoice = (event: ChangeEvent<HTMLInputElement>) => {
        const choices = [...form.choices];
        choices[Number(event?.target?.dataset['index']) || 0] =
            event.target.value;
        setForm({ ...form, choices });
    };

    const addOption = () => {
        const choices = [...form.choices];
        choices.push('');
        setForm({ ...form, choices });
    };

    const createPoll = () => {
        if (state.online) {
            pollsStore.create(form, (response) => {
                history.push(response.data.url);
            });
            window.localStorage.removeItem('abandoned_poll');
            notificationsStore.removeNotificationByName('abandoned_poll');
        } else {
            window.localStorage.setItem('abandoned_poll', JSON.stringify(form));
            notificationsStore.addNotification({
                name: 'poll_created',
                title: 'Your poll was saved! Please back to us when September ends. Because this is the time when Vodafone will start work again... 😅',
                type: EnumsNotificationTypes.SUCCESS,
            });
        }
    };

    return (
        <>
            <Typography as="h1" fontSize="large" fontWeight="bold">
                Create a poll
            </Typography>
            <div>
                <StyledInput
                    label="Poll question"
                    value={form.question}
                    onChange={setQuestion}
                    name="question"
                    error={pollsStore.errors?.question || ''}
                    data-testid="poll-question-input"
                />
                {form.choices.map((choice, index) => {
                    return (
                        <StyledInput
                            label="Poll option"
                            key={`choice-${index}`}
                            value={choice}
                            onChange={setChoice}
                            name={`choice-${index}`}
                            data-index={index}
                            data-testid={`poll-option-input-${index}`}
                            error={
                                pollsStore.errors?.choices &&
                                pollsStore.errors?.choices[index]
                            }
                        />
                    );
                })}
                <Button onClick={addOption} color="second">
                    Add another option
                </Button>
                <Divider />
                <Button
                    data-testid="submit-poll-button"
                    onClick={createPoll}
                    color="accent"
                >
                    Create your poll
                </Button>
            </div>
        </>
    );
});
