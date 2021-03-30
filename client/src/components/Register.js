import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Text,
    View,
} from 'react-native';

export default function Register({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../images/logo.png')} />
            <TextInput
                style={styles.input}
                placeholder=" Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder=" Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TextInput
                style={styles.input}
                placeholder=" Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder=" Confirm Password"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Search', { screen: 'SearchScreen' });
                }}
            >
                <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Login');
                }}
            ></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#F26F20',
        padding: 10,
        margin: 10,
        width: 200,
        borderRadius: 5,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    logo: {
        height: 150,
        width: 150,
        marginBottom: 10,
    },
    text: {
        margin: 10,
    },
});
