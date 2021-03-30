import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';

export default function Login({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

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
            <TouchableOpacity
                style={styles.button}
                // onPress={() => {

                // }}
            >
                <Text>Login</Text>
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
