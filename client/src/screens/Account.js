import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Container, Content, Button, Text } from 'native-base';
import FooterTabs from '../components/navigation/FooterTabs';
import Header from '../components/Header';
import { useHistory } from 'react-router-native';
// import RouterButton from 'react-router-native-button';

const Account = ({ user }) => {
    const history = useHistory();
    function handleLogOut() {
        history.push('/');
    }
    return (
        <Container style={styles.container}>
            <Header />
            <Content
                contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={styles.text}>Name: {user.username}</Text>
                <Text style={styles.text}>Email: {user.email}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleLogOut();
                    }}
                >
                    <Text>LogOut</Text>
                </TouchableOpacity>
            </Content>
            <FooterTabs />
        </Container>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#F26F20',
        padding: 10,
        margin: '10%',
        width: 200,
        borderRadius: 5,
    },
    text: {
        textAlign: 'center',
        paddingBottom: 20,
        fontSize: 30,
    },
});
export default Account;
