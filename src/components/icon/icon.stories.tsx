import React from 'react';
import styled from 'styled-components';

import { Icon, Props, icons } from './icon';

const Meta = styled.div`
    color: #666;
    font-size: 12px;
`;

const Item = styled.li`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    flex: 0 1 20%;
    min-width: 120px;
    padding: 0px 7.5px 20px;
    svg {
        margin-right: 10px;
        width: 24px;
        height: 24px;
    }
`;

const List = styled.ul`
    display: flex;
    flex-flow: row wrap;
    list-style: none;
`;

export default {
    title: 'Icon',
    component: Icon,
};

export const Basic = (args: Props) => <Icon {...args} />;
Basic.args = {
    name: 'check',
    size: 'small',
    color: 'dark-medium',
};

export const All = () => (
    <>
        There are {Object.keys(icons).length} icons
        <List>
            {Object.keys(icons).map((key) => (
                <Item key={key}>
                    <Icon name={key} />
                    <Meta>{key}</Meta>
                </Item>
            ))}
        </List>
    </>
);
