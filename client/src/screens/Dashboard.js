import React from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import { Container, Content, List, ListItem, Body, Button } from 'native-base';
import FooterTabs from '../components/navigation/FooterTabs';

const Dashboard = () => {
    return (
        <Container style={{ width: '100%' }}>
            <Content contentContainerStyle={{ flex: 1 }}>
                <Text
                    style={{
                        textAlign: 'center',
                        paddingBottom: 20,
                        fontSize: 30,
                    }}
                >
                    {/* Hi, {user.username} */}
                </Text>
                <List>
                    <ListItem>
                        <Body style={styles.body}>
                            <Text style={styles.textBoxTicker}>Ticker</Text>
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
                            <TextInput style={styles.textInputBox}></TextInput>
                            <Button style={styles.button}>
                                <Text style={styles.bottonText}>Buy</Text>
                            </Button>
                            <Button style={styles.button}>
                                <Text style={styles.bottonText}>Sell</Text>
                            </Button>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Body style={styles.body}>
                            <Text style={styles.textBox}>AAPL</Text>
                            <Text style={styles.textBox}>$200</Text>
                            <Text style={styles.textBox}>1</Text>
                            <Text style={styles.textBox}>$400</Text>
                            <TextInput style={styles.textInputBox}></TextInput>
                            <Button style={styles.button}>
                                <Text style={styles.bottonText}>Buy</Text>
                            </Button>
                            <Button style={styles.button}>
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
