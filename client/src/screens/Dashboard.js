import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Left,
    Body,
    Right,
    Button,
} from 'native-base';
import FooterTabs from '../components/navigation/FooterTabs';
import Header from '../components/Header';

const Dashboard = ({ user }) => {
    return (
        <Container style={{ width: '100%' }}>
            <Header />
            <Content contentContainerStyle={{ flex: 1 }}>
                <Text
                    style={{
                        textAlign: 'center',
                        paddingBottom: 20,
                        fontSize: 30,
                    }}
                >
                    Hi, {user.username}
                </Text>
                <List>
                    <ListItem>
                        <Body style={styles.body}>
                            <Text style={styles.textBox}>Ticker</Text>
                            <Text style={styles.textBox}>Price</Text>
                            <Text style={styles.textBox}>QTY</Text>
                            <Text style={styles.textBox}>Total</Text>
                            <Text style={styles.textBox}>Option</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Body style={styles.body}>
                            <Text style={styles.textBox}>APsssL</Text>
                            <Text style={styles.textBox}>$200</Text>
                            <Text style={styles.textBox}>1</Text>
                            <Text style={styles.textBox}>$400</Text>
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
                            <Text style={styles.textBox}>APsdsss</Text>
                            <Text style={styles.textBox}>$200</Text>
                            <Text style={styles.textBox}>1</Text>
                            <Text style={styles.textBox}>$40000</Text>
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
            <FooterTabs />
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
        padding: '2%',
        backgroundColor: '#ffb347',
        width: '10%',
        textAlign: 'center',
        marginLeft: '1%',
    },
    bottonText: {
        color: '#FFFF',
        textAlign: 'center',
        fontSize: 12,
    },
    textBox: {
        width: '20%',
        textAlign: 'center',
    },
});

export default Dashboard;
