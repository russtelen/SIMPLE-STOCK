import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { Container, Content, List, ListItem, Body, Button } from 'native-base';
import { getUser } from '../network';

const Dashboard = ({ user }) => {
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);

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

    useEffect(() => {
        (async () => {
            const result = await getUser();
            setTransactions(result.user.transactions);
            console.log(transactions);
        })();
    }, []);

    // {messages.map((message) => (
    //     <UserMessage
    //         key={message._id}
    //         className={classes.message}
    //         message={message}
    //         cognitoId={user.cognito_id}
    //     ></UserMessage>
    // ))}
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Container style={{ width: '100%' }}>
                    <Content contentContainerStyle={{ flex: 1 }}>
                        <Text style={styles.greetingText}>
                            Hi, {user.username}
                        </Text>
                        <List>
                            <ListItem>
                                <Body style={styles.body}>
                                    <Text style={styles.textHeader}>
                                        Ticker
                                    </Text>
                                    <Text style={styles.textHeader}>Price</Text>
                                    <Text style={styles.textHeader}>QTY</Text>
                                    <Text style={styles.textHeader}>Total</Text>
                                    <Text style={styles.textHeader}>
                                        Amount
                                    </Text>
                                    <Text style={styles.textHeader}>
                                        Option
                                    </Text>
                                </Body>
                            </ListItem>

                            {transactions.map((transaction) => (
                                <ListItem key={transaction._id}>
                                    <Body style={styles.body}>
                                        <Text style={styles.text}>
                                            {transaction.symbol}
                                        </Text>
                                        <Text style={styles.text}>
                                            {transaction.quotePrice}
                                        </Text>
                                        <Text style={styles.text}>
                                            {transaction.numShares}
                                        </Text>
                                        {/* <Text style={styles.text}>$400</Text> */}
                                        <TextInput
                                            style={styles.textInputBox}
                                            clearButtonMode="always"
                                            keyboardType="number-pad"
                                            value={amount}
                                            onChangeText={(event) =>
                                                setAmount(event)
                                            }
                                        ></TextInput>
                                        <Button
                                            style={styles.button}
                                            onPress={() => handleBuy(amount)}
                                        >
                                            <Text style={styles.bottonText}>
                                                Buy
                                            </Text>
                                        </Button>
                                        <Button
                                            style={styles.button}
                                            onPress={() => handleSell(amount)}
                                        >
                                            <Text style={styles.bottonText}>
                                                Sell
                                            </Text>
                                        </Button>
                                    </Body>
                                </ListItem>
                            ))}
                        </List>
                    </Content>
                </Container>
            </ScrollView>
        </SafeAreaView>
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
    textHeader: {
        width: '16%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
    },
    textInputBox: { borderWidth: 1, width: '12%' },
});

export default Dashboard;
