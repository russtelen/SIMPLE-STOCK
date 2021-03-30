import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Auth from '../client/src/screens/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [token, setToken] = useState({});

    useEffect(() => {
        const storeToken = async () => {
            try {
                const jsonToken = JSON.stringify(token);
                AsyncStorage.setItem('token', jsonToken);
            } catch (e) {
                console.log(e);
            }
        };
        storeToken();
    }, [token]);

    return (
        <View style={styles.container}>
            {console.log(token)}
            <Auth setToken={setToken} name="Auth"></Auth>
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
});
