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
import FooterTabs from '../components/navigation/BottomTabNavigator';

const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
};

const Auth = ({ setToken }) => {
    // Handlers
    //-----------------------------------
    //   Login handler
    const submitLogin = async (data) => {
        const token = await loginUser(data);
        //  @TODO
        //  Save this token to 'localStorage'
        if (token) {
            setToken(token.accessToken);
        }
        //  Then Redirect to home page
        // console.log(token);
    };

    //   Register Handler
    const submitRegister = async (data) => {
        const token = await registerUser(data);

        if (token.error) {
            alert(token.error);
            return;
        }

        //  @TODO
        //  Save this token to 'localStorage'
        if (token) {
            setToken(token.accessToken);
        }
        //  Then Redirect to home page
        // console.log(token);
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
