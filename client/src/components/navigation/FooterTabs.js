import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon,
} from 'native-base';
import { Text } from 'react-native';
import { Link } from 'react-router-native';

export default class FooterTabs extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Link to="/dashboard">
                        {/* <Button active> */}
                        <Icon name="home" />
                        {/* </Button> */}
                    </Link>
                    <Link to="/">
                        {/* <Button> */}
                        <Icon name="search" />
                        {/* <Text>Search</Text> */}
                        {/* </Button> */}
                    </Link>
                    <Link to="/account">
                        <Button vertical>
                            <Icon active name="person" />
                            <Text>Account</Text>
                        </Button>
                    </Link>
                </FooterTab>
            </Footer>
        );
    }
}
