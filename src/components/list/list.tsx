import React from 'react';
import { observer } from 'mobx-react-lite';
import s from 'styled-components';
import { useStores } from 'store';
import { Card } from 'components/card/card';
import { Typography } from 'components/typography';
import { Label } from 'components/label/label';
import { Placeholder } from 'components/placeholder/placeholder';

type Props = {};

const StyledList = s.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const timeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
});

const PositionedLabel = s(Label)`
    position: absolute;
    top: -17px;
    right: -15px;
`;

const Link = s.a`
    display: block;
    width: 100%;
    text-decoration: none;
`;

/**
 * List Component
 */
export const List: React.FC<Props> = observer(() => {
    const { pollsStore } = useStores();

    return (
        <StyledList>
            {pollsStore.items.length > 0
                ? pollsStore.items.map((item) => (
                      <Card key={item.url}>
                          <Link href={item.url}>
                              <Typography
                                  color="dark-medium"
                                  fontSize="big"
                                  fontWeight="bold"
                              >
                                  {item.question}
                              </Typography>
                              <Typography
                                  color="dark-light"
                                  fontSize="tiny"
                                  fontWeight="bold"
                                  style={{ marginTop: 10 }}
                              >
                                  Added{' '}
                                  {timeFormatter.format(
                                      new Date(item.published_at)
                                  )}
                              </Typography>
                              <PositionedLabel>
                                  {item.votesCount} Votes
                              </PositionedLabel>
                          </Link>
                      </Card>
                  ))
                : new Array(10)
                      .fill(1)
                      .map((_, index) => <Placeholder key={index} />)}
        </StyledList>
    );
});
