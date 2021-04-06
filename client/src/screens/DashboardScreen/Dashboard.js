import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Container, Content, List, ListItem, Body } from 'native-base';
import { getUser, getPosition } from '../../network';
import StockItems from './StockItems';

const Dashboard = ({ user }) => {
    // const [transactions, setTransactions] = useState([]);
    const [postionResults, setPostionResults] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        (async () => {
            const postionResults = await getPosition();
            setPostionResults(postionResults.positions);
        })();
    }, [rerender]);

    return (
        <ScrollView style={styles.scrollView}>
            <Container style={{ width: '100%' }}>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Text style={styles.greetingText}>Hi, {user.username}</Text>
                    <List>
                        <ListItem>
                            <Body style={styles.body}>
                                <Text style={styles.textHeader}>Ticker</Text>
                                <Text style={styles.textHeader}>Price</Text>
                                <Text style={styles.textHeader}>QTY</Text>
                                <Text style={styles.textHeader}>Total</Text>
                                <Text style={styles.textHeader}>
                                    Current price
                                </Text>
                                <Text style={styles.textHeader}>Amount</Text>
                                <Text style={styles.textHeader}>Option</Text>
                            </Body>
                        </ListItem>
                        {postionResults?.length > 0 ? (
                            <>
                                {postionResults.map((postionResult) => (
                                    <StockItems
                                        postionResult={postionResult}
                                        setRerender={setRerender}
                                        key={postionResult.symbol}
                                    />
                                ))}
                            </>
                        ) : (
                            <Text style={styles.noTransText}>
                                You have no transaction!
                            </Text>
                        )}
                    </List>
                </Content>
            </Container>
        </ScrollView>
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
    noTransText: { textAlign: 'center', padding: '5%', fontSize: 15 },
    textHeader: {
        width: '14%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
    },
});

export default Dashboard;
