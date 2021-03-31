import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';

export default function Login({ submitLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        submitLogin({ username, password });
        setUsername('');
        setPassword('');
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../images/logo.png')} />
            <TextInput
                style={styles.input}
                placeholder=" Username"
                autoCapitalize="none"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                type="password"
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder=" Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{ color: '#FFFF' }}>Login</Text>
            </TouchableOpacity>
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
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
    },
    logo: {
        height: 200,
        width: 250,
        marginBottom: 10,
    },
    text: {
        margin: 10,
    },
});
