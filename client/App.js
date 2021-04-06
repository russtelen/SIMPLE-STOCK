import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Auth from '../client/src/screens/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { NativeRouter, Route } from 'react-router-native';
import Dashboard from './src/screens/DashboardScreen/Dashboard';
import Account from './src/screens/AccountScreen/Account';
import Search from './src/screens/Search';
import Header from './src/components/Header';
import FooterTabs from './src/components/navigation/FooterTabs';

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
    }, [token]);

    //getting user info
    useEffect(() => {
        const user = token ? jwtDecode(token) : null;
        setUser(user);
    }, [token]);
    return (
        <NativeRouter>
            {token ? (
                <>
                    <Header />

                    <Route exact path="/dashboard">
                        <Dashboard user={user} />
                    </Route>
                    <Route exact path="/account">
                        <Account user={user} setToken={setToken} />
                    </Route>
                    <Route exact path="/search">
                        <Search user={user} setToken={setToken} />
                    </Route>
                    <FooterTabs />
                </>
            ) : (
                <View style={styles.container}>
                    <Route exact path="/">
                        <Auth setToken={setToken} name="Auth" />
                    </Route>
                </View>
            )}
        </NativeRouter>
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
