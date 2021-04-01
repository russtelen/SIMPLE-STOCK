import React, { useState } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import { Container, Content, List, ListItem, Body, Button } from 'native-base';

const Dashboard = ({ user }) => {
    const [amount, setAmount] = useState();

    //handling buy
    const handleBuy = async (data) => {
        try {
            //only allow number input
            const numericRegex = /^([0-9]{1,100})+$/;
            if (numericRegex.test(amount)) {
                alert(`Successsfully bought ${amount} share(s) `);
            } else {
                alert(`Invaild input!`);
            }
            setAmount('');
        } catch (e) {
            console.log(e);
        }
    };

    //handling sell
    const handleSell = async (data) => {
        try {
            //only allow number input
            const numericRegex = /^([0-9]{1,100})+$/;
            if (numericRegex.test(amount)) {
                alert(`Successsfully sold ${amount} share(s)`);
            } else {
                alert(`Invaild input!`);
            }
            setAmount('');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container style={{ width: '100%' }}>
            <Content contentContainerStyle={{ flex: 1 }}>
                <Text style={styles.greetingText}>Hi, {user.username}</Text>
                <List>
                    <ListItem>
                        <Body style={styles.body}>
                            <Text style={styles.textBox}>Ticker</Text>
                            <Text style={styles.textBox}>Price</Text>
                            <Text style={styles.textBox}>QTY</Text>
                            <Text style={styles.textBox}>Total</Text>
                            <Text style={styles.textBox}>Amount</Text>
                            <Text style={styles.textBox}>Option</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Body style={styles.body}>
                            <Text style={styles.textBox}>APL</Text>
                            <Text style={styles.textBox}>$200</Text>
                            <Text style={styles.textBox}>1</Text>
                            <Text style={styles.textBox}>$400</Text>
                            <TextInput
                                style={styles.textInputBox}
                                clearButtonMode="always"
                                keyboardType="number-pad"
                                value={amount}
                                onChangeText={(event) => setAmount(event)}
                            ></TextInput>
                            <Button
                                style={styles.button}
                                onPress={() => handleBuy(amount)}
                            >
                                <Text style={styles.bottonText}>Buy</Text>
                            </Button>
                            <Button
                                style={styles.button}
                                onPress={() => handleSell(amount)}
                            >
                                <Text style={styles.bottonText}>Sell</Text>
                            </Button>
                        </Body>
                    </ListItem>
                </List>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '1%',
        alignItems: 'center',
    },
    greetingText: {
        textAlign: 'center',
        padding: '5%',
        fontSize: 30,
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#ffb347',
        padding: '1%',
        marginLeft: '1%',
    },
    bottonText: {
        color: '#FFFF',
        fontSize: 12,
        textAlign: 'center',
    },
    textBox: {
        width: '16%',
        textAlign: 'center',
    },
    textInputBox: { borderWidth: 1, width: '15%' },
});

export default Dashboard;
