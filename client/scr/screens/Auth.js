import React, { Component } from 'react';
import {
    Container,
    Header,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    Text,
} from 'native-base';
import Login from '../components/Login';
import Register from '../components/Register';

export default class Auth extends Component {
    render() {
        return (
            <Container>
                <Header hasTabs />
                <Tabs>
                    <Tab
                        heading={
                            <TabHeading>
                                <Text>Login</Text>
                            </TabHeading>
                        }
                    >
                        <Login />
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading>
                                <Text>Register</Text>
                            </TabHeading>
                        }
                    >
                        <Register />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
