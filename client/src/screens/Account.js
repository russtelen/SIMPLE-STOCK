import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { useHistory } from 'react-router-native';
import { logoutUser, getUser } from '../network';
import { List } from 'react-native-paper';
import TransactionList from '../components/AccountPage/TransactionList';
import ProfileDetail from '../components/AccountPage/ProfileDetail';
import WatchList from '../components/AccountPage/WatchList';

const Account = ({ setToken }) => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [watchlists, setWatchlists] = useState([]);
    const [expanded, setExpanded] = useState(true);

    const handlePress = () => setExpanded(!expanded);
    const [transactions, setTransactions] = useState([]);

    const handleLogOut = async () => {
        const res = await logoutUser();

        if (res) {
            setToken(null);
            history.push('/');
            alert(res.message);
        }
    };

    useEffect(() => {
        (async () => {
            const result = await getUser();
            setUser(result.user);
            setWatchlists(result.user.watchlist);
            setTransactions(result.user.transactions);
        })();
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const result = await getUser();
    //         setUser(result.user);
    //         console.log(watchlists);
    //     })();
    // }, [user?.watchlist?.length]);

    return (
        <ScrollView>
            <Container style={styles.container}>
                <Content
                    contentContainerStyle={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.text}>
                        Account balance: ${user?.initialCash?.toFixed(2)}
                    </Text>
                    {/* ------------------Profil detail ----------------------- */}
                    <List.Section style={styles.container}>
                        <List.Accordion
                            title="Profile Detail"
                            onPress={handlePress}
                        >
                            <ProfileDetail user={user} />
                        </List.Accordion>
                    </List.Section>
                    {/* ------------------Transaction History ----------------------- */}
                    <List.Section style={styles.container}>
                        <List.Accordion
                            title="Transaction History"
                            onPress={handlePress}
                            // style={{ flex: 1 }}
                        >
                            {transactions.map((transaction) => (
                                <TransactionList
                                    transaction={transaction}
                                    key={transaction._id}
                                />
                            ))}
                        </List.Accordion>
                    </List.Section>
                    {/* ------------------Watch List ----------------------- */}
                    <List.Section style={styles.container}>
                        <List.Accordion
                            title="Watch List"
                            onPress={handlePress}
                            // style={{ flex: 1 }}
                        >
                            {watchlists.map((watchlist) => (
                                <WatchList
                                    watchlist={watchlist}
                                    key={watchlist._id}
                                />
                            ))}
                        </List.Accordion>
                    </List.Section>

                    {/* ------------------log out button ----------------------- */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleLogOut();
                        }}
                    >
                        <Text style={styles.buttonText}>LogOut</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: '5%',
        marginBottom: '1%',
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#F26F20',
        padding: 10,
        margin: '10%',
        width: 200,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFF',
    },
    text: {
        textAlign: 'center',
        paddingBottom: 20,
        fontSize: 20,
    },
});
export default Account;
