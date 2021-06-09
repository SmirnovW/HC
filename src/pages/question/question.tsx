import React, { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import s from 'styled-components';
import { useParams } from 'react-router';
import { useStores } from 'store';
import { Typography } from 'components/typography';
import { Card } from 'components/card/card';
import { Radio } from 'components/radio/radio';
import { Button } from 'components/button/button';
import { Progress } from 'components/progress/progress';
import { Placeholder } from 'components/placeholder/placeholder';
import { EnumsNotificationTypes } from 'store/notifications/enums';

const Container = s.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Counter = s(Typography)`
    position: absolute;
    top: 15px;
    right: 20px;
`;

/**
 * Questions Component
 */
export const Question: React.FC = observer(() => {
    const { notificationsStore } = useStores();
    const [choiceId, setChoiceId] = useState<string | null>(null);
    const { questionStore } = useStores();

    const { questionId } =
        useParams<{
            questionId: string;
        }>();

    useEffect(() => {
        questionStore.fetch(questionId);
    }, [questionId, questionStore]);

    const setChoice = (event: ChangeEvent<HTMLInputElement>) => {
        setChoiceId(event.target.value);
    };

    const voteForChoice = () => {
        if (choiceId) {
            questionStore.vote(questionId, choiceId, () => {
                notificationsStore.addNotification({
                    name: 'vote_accepted',
                    title: 'Your voice was accepted',
                    type: EnumsNotificationTypes.SUCCESS,
                });
            });
        }
    };

    return (
        <Container>
            <Typography
                data-testid="question-title"
                as="h1"
                fontSize="large"
                fontWeight="bold"
            >
                {questionStore.data?.question}
            </Typography>
            {questionStore.data ? (
                <>
                    {questionStore.data?.choices.map((choice, index) => {
                        const percentage = questionStore.data?.votesCount
                            ? (choice.votes * 100) /
                              questionStore.data?.votesCount
                            : 0;

                        return (
                            <Card key={choice.id}>
                                <Radio
                                    label={choice.choice}
                                    onChange={setChoice}
                                    name="choice"
                                    value={choice.id}
                                    data-testid={`poll-choice-${index}`}
                                />
                                <Progress percentage={Math.ceil(percentage)} />
                                <Typography
                                    fontSize="small"
                                    fontWeight="bold"
                                    color="dark-light"
                                >
                                    {choice.votes}{' '}
                                    {choice.votes > 1 ? 'votes' : 'vote'}
                                </Typography>
                                <Counter fontSize="big" fontWeight="bold">
                                    {Math.ceil(percentage)}%
                                </Counter>
                            </Card>
                        );
                    })}
                    <Button
                        onClick={voteForChoice}
                        color="accent"
                        data-testid="submit-vote-button"
                        disabled={!Boolean(choiceId)}
                    >
                        Submit your vote
                    </Button>
                </>
            ) : (
                new Array(5)
                    .fill(1)
                    .map((_, index) => <Placeholder key={index} />)
            )}
        </Container>
    );
});
