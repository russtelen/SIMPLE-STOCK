import React, { Component } from 'react';
import {
    Container,
    Header,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    Text,
    DefaultTabBar
} from 'native-base';
import Login from '../components/Login';
import Register from '../components/Register';


const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

export default class Auth extends Component {
    render() {
        return (
            <Container>
                {/* <Header hasTabs style={{backgroundColor: '#F26F20'}}/> */}
                <Tabs renderTabBar={renderTabBar}>
                    <Tab 
                        heading={
                            <TabHeading style={{backgroundColor: '#F26F20'}} >
                                <Text >Login</Text>
                            </TabHeading>
                        }
                    >
                        <Login />
                    </Tab>
                    <Tab 
                        heading={
                            <TabHeading style={{backgroundColor: '#F26F20'}}>
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
