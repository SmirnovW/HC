import React, { ChangeEvent, useState } from 'react';
import s from 'styled-components';
import { useHistory } from 'react-router';
import { useStores } from 'store';
import { Typography } from 'components/typography';
import { Button } from 'components/button';
import { Input } from 'components/input/input';
import { observer } from 'mobx-react-lite';
//import { useNetworkState } from 'react-use';

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
export const CreatePoll: React.FC<Props> = observer(
    ({
        data = {
            question: '',
            choices: ['', ''],
        },
    }) => {
        // const state = useNetworkState();
        const state = {
            online: false,
        };
        const history = useHistory();
        const { pollsStore } = useStores();
        const [form, setForm] = useState(data);

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
            } else {
                window.localStorage.setItem(
                    'abandoned_poll',
                    JSON.stringify(form)
                );
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
                    <Button onClick={createPoll} color="accent">
                        Create your poll
                    </Button>
                </div>
            </>
        );
    }
);
