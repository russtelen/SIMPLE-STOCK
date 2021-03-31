import React from 'react';
import { Text, Button } from 'react-native';
import { Link } from 'react-router-native';
import { Container, Content } from 'native-base';
import FooterTabs from '../components/navigation/FooterTabs';
import Header from '../components/Header';
// import RouterButton from 'react-router-native-button';

const Account = ({ user }) => {
    return (
        <Container style={{ width: '100%' }}>
            <Header />
            <Content contentContainerStyle={{ flex: 1 }}>
                <Text
                    style={{
                        textAlign: 'center',
                        paddingBottom: 20,
                        fontSize: 30,
                    }}
                >
                    Name: {user.username}
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        paddingBottom: 20,
                        fontSize: 30,
                    }}
                >
                    Email: {user.email}
                </Text>

                <Link to="/">
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 30,
                        }}
                    >
                        Logout
                    </Text>
                </Link>
            </Content>
            <FooterTabs />
        </Container>
    );
};

export default Account;
