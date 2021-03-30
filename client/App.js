import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../client/scr/components/Login';
import Auth from '../client/scr/screens/Auth';

export default function App() {
    return (
        <View style={styles.container}>
            <Auth name="Auth"></Auth>
            {/* <Login /> */}
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
