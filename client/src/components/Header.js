import React, { useEffect } from 'react';
import { Header, Left, Body, Right, Title } from 'native-base';

export default function Head() {
    return (
        <Header style={{ backgroundColor: '#F26F20' }}>
            <Left />
            <Body>
                <Title style={{ color: '#FFFF' }}>Simply Stock</Title>
            </Body>
            <Right />
        </Header>
    );
}
