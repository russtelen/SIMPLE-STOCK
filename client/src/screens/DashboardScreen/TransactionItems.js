import React, { useState } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import { ListItem, Body, Button } from 'native-base';

const TransactionItems = ({ transaction }) => {
    const [amount, setAmount] = useState('');

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
        <ListItem>
            <Body style={styles.body}>
                <Text style={styles.text}>{transaction.symbol}</Text>
                <Text style={styles.text}>{transaction.quotePrice}</Text>
                <Text style={styles.text}>{transaction.numShares}</Text>
                {/* <Text style={styles.text}>$400</Text> */}
                <TextInput
                    style={styles.textInputBox}
                    clearButtonMode="always"
                    keyboardType="number-pad"
                    value={amount}
                    onChangeText={(event) => setAmount(event)}
                ></TextInput>
                <Button style={styles.button} onPress={() => handleBuy(amount)}>
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
    buttonView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#ffb347',
        padding: '1%',
        marginLeft: '2%',
    },
    bottonText: {
        color: '#FFFF',
        fontSize: 12,
        textAlign: 'center',
    },
    text: {
        width: '16%',
        textAlign: 'center',
    },
    textInputBox: { borderWidth: 1, width: '12%' },
});

export default TransactionItems;
