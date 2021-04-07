import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextInput, View } from 'react-native';
import { ListItem, Body, Button, Toast } from 'native-base';
import finnhub from '../../api/Finnub';
import { stockTransaction } from '../../network';
import { API_KEY } from '@env';

const StockItems = ({ postionResult, setRerender }) => {
    const [amount, setAmount] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    //fetch current price
    useEffect(() => {
        (async () => {
            try {
                const response = await finnhub.get(
                    `quote?symbol=${postionResult.symbol}&token=${API_KEY}`
                );
                setCurrentPrice(response.data.c);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [currentPrice]);

    //handling buy
    const handleBuy = async (data) => {
        try {
            const res = await stockTransaction(data);
            if (res) {
                Toast.show({
                    text: res.message,
                    position: 'bottom',
                    type: 'success',
                    duration: 1500,
                });
                setRerender((prev) => !prev);
                setAmount('');
            }
        } catch (e) {
            console.log(e);
        }
    };

    //handling sell
    const handleSell = async (data) => {
        try {
            const res = await stockTransaction(data);
            if (res) {
                Toast.show({
                    text: res.message,
                    position: 'bottom',
                    type: 'success',
                    duration: 1500,
                });
                setRerender((prev) => !prev);
                setAmount('');
            }
        } catch (e) {
            console.log(e);
        }
    };

    //turn total To 2 Demical
    const total = postionResult.avgPricePerShare * postionResult.numSharesTotal;
    const totalTo2Demical = total.toFixed(2);

    return (
        <ListItem>
            <Body style={styles.body}>
                <Text style={styles.text}>{postionResult.symbol}</Text>
                <Text style={styles.text}>
                    ${postionResult?.avgPricePerShare?.toFixed(2)}
                </Text>
                <Text style={styles.qtyText}>
                    {postionResult.numSharesTotal}
                </Text>
                <Text style={styles.text}>${totalTo2Demical}</Text>
                <Text style={styles.text}>${currentPrice}</Text>
                <TextInput
                    style={styles.textInputBox}
                    clearButtonMode="always"
                    type="number"
                    keyboardType="number-pad"
                    value={amount}
                    onChangeText={(event) => setAmount(event)}
                ></TextInput>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        style={styles.buyButton}
                        onPress={() =>
                            handleBuy({
                                symbol: postionResult.symbol,
                                numShares: amount,
                                quotePrice: -currentPrice,
                            })
                        }
                    >
                        <Text style={styles.bottonText}>Buy</Text>
                    </Button>
                    <Button
                        style={styles.sellButton}
                        onPress={() =>
                            handleSell({
                                symbol: postionResult.symbol,
                                numShares: amount,
                                quotePrice: currentPrice,
                            })
                        }
                    >
                        <Text style={styles.bottonText}>Sell</Text>
                    </Button>
                </View>
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
    buyButton: {
        backgroundColor: 'green',
        padding: '5%',
        marginVertical: '10%',
        width: 45,
        height: 20,
    },
    sellButton: {
        backgroundColor: 'red',
        padding: '5%',
        marginVertical: '10%',
        width: 45,
        height: 20,
    },
    bottonText: {
        color: '#FFFF',
        fontSize: 12,
        textAlign: 'center',
    },
    text: {
        width: '15%',
        textAlign: 'center',
        fontSize: 13,
    },
    qtyText: {
        width: '8%',
        textAlign: 'center',
    },
    textInputBox: { borderWidth: 1, width: '6%' },
});
export default StockItems;
