import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Auth from '../client/src/screens/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export default function App() {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    //store token to async storage
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
        console.log(token);
    }, [token]);

    //getting user info
    useEffect(() => {
        const user = token ? jwtDecode(token) : null;
        setUser(user);
        console.log(user);
    }, [token]);

    return (
        <View style={styles.container}>
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
