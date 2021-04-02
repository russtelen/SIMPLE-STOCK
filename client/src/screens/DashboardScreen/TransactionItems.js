import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import { ListItem, Body, Button } from 'native-base';
import finnhub from '../../api/Finnub';

const TransactionItems = ({ transaction }) => {
    const [amount, setAmount] = useState('');
    const [results, setResults] = useState();

    //fetch current price
    useEffect(() => {
        (async () => {
            try {
                const response = await finnhub.get(
                    `quote?symbol=${transaction.symbol}&token=c1jfqff48v6q1q0kpsi0`
                );
                console.log('results', results);
                setResults(response.data.c);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [results]);

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

    //Total To 2 Demical
    const total = transaction.numShares * transaction.quotePrice;
    const totalTo2Demical = total.toFixed(2);

    return (
        <ListItem>
            <Body style={styles.body}>
                <Text style={styles.text}>{transaction.symbol}</Text>
                <Text style={styles.text}>${transaction.quotePrice}</Text>
                <Text style={styles.text}>{transaction.numShares}</Text>
                <Text style={styles.text}>${totalTo2Demical}</Text>
                <Text style={styles.text}>${results}</Text>
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
        marginLeft: '1%',
    },
    bottonText: {
        color: '#FFFF',
        fontSize: 12,
        textAlign: 'center',
    },
    text: {
        width: '14%',
        textAlign: 'center',
    },
    textInputBox: { borderWidth: 1, width: '12%' },
});

export default TransactionItems;
