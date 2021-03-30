import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AccountScreen() {
    return (
        <View style={styles.container}>
            <Text>Name</Text>
            <Text>Mail</Text>
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
