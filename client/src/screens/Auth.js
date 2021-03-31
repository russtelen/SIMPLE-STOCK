import React from 'react';
import {
    Container,
    Tab,
    Tabs,
    TabHeading,
    Text,
    DefaultTabBar,
    Content,
} from 'native-base';
import Login from '../components/Login';
import Register from '../components/Register';
import { loginUser, registerUser } from '../network';
import { useHistory } from 'react-router-native';
import FooterTabs from '../components/navigation/FooterTabs';

const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
};

const Auth = ({ setToken }) => {
    const history = useHistory();

    // Handlers
    //-----------------------------------
    //   Login handler
    const submitLogin = async (data) => {
        const token = await loginUser(data);

        if (token.accessToken) {
            // save token to local storage
            setToken(token.accessToken);
            //  Then Redirect to dashboard page
            history.push('/dashboard');
        }
    };

    //   Register Handler
    const submitRegister = async (data) => {
        const token = await registerUser(data);

        if (token.error) {
            alert(token.error);
            return;
        }

        if (token.accessToken) {
            // save token to local storage
            setToken(token.accessToken);
            // Then Redirect to dashboard page
            history.push('/dashboard');
        }
    };

    return (
        <Container>
            <Content>
                {/* <Header hasTabs style={{ backgroundColor: "#F26F20" }} /> */}
                <Tabs renderTabBar={renderTabBar}>
                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: '#F26F20' }}>
                                <Text>Login</Text>
                            </TabHeading>
                        }
                    >
                        <Login submitLogin={submitLogin} />
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: '#F26F20' }}>
                                <Text>Register</Text>
                            </TabHeading>
                        }
                    >
                        <Register submitRegister={submitRegister} />
                    </Tab>
                </Tabs>
            </Content>
            <FooterTabs />
        </Container>
    );
};

export default Auth;
