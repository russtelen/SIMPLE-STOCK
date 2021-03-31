import React, { Component } from 'react';
import { Footer, FooterTab, Icon, Button, Text } from 'native-base';
import { Link } from 'react-router-native';

const FooterTabs = () => {
    return (
        <Footer>
            <FooterTab style={{ backgroundColor: '#F26F20', padding: '3%' }}>
                <Link to="/dashboard">
                    {/* <Button active> */}
                    <Icon style={{ color: '#FFFF' }} name="home" />
                    {/* </Button> */}
                </Link>
                <Link to="/">
                    {/* <Button> */}
                    <Icon style={{ color: '#FFFF' }} name="search" />
                    {/* <Text>Search</Text> */}
                    {/* </Button> */}
                </Link>
                <Link to="/account">
                    {/* <Button vertical> */}
                    <Icon style={{ color: '#FFFF' }} active name="person" />
                    {/* <Text>Account</Text>
                    </Button> */}
                </Link>
            </FooterTab>
        </Footer>
    );
};

export default FooterTabs;
