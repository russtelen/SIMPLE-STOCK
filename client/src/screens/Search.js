import React, { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { Toast } from 'native-base';
import finnhub from '../api/Finnub';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { API_KEY } from '@env';
import { addToWatchlist, getUser, stockTransaction } from '../network';

export default function Search() {
    const [results, setResults] = useState();
    const [term, setTerm] = useState();
    const [userWatchList, setUserWatchList] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [numberOfShares, setNumberOfShares] = useState(1);
    const [ticker, setTicker] = useState('');

    //click the like button to add to watchlist
    const likeCliked = async (data) => {
        try {
            const index = userWatchList.findIndex(
                (watchList) => watchList.symbol == term
            );
            //check if ticker already in the watchlist
            if (index == -1) {
                const res = await addToWatchlist(data);
                setIsAdded((prev) => !prev);
                Toast.show({
                    text: res.message,
                    position: 'bottom',
                    type: 'success',
                    duration: 1500,
                });
                console.log(isAdded);
            } else {
                Toast.show({
                    text: `You have already added ${term} into the watchlist!`,
                    position: 'bottom',
                    type: 'danger',
                    duration: 1500,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {}, [results]);

    //fetch user watchlist
    useEffect(() => {
        (async () => {
            const result = await getUser();
            setUserWatchList(result.user.watchlist);
        })();
    }, [isAdded]);

    const searchAPI = async (data) => {
        const response = await finnhub.get(
            `quote?symbol=${data}&token=${API_KEY}`
        );
        //console.log("results", results)
        setResults(response.data.c);
        setTicker(term);
    };

    //handling buy
    const handleBuy = async (data) => {
        try {
            const res = await stockTransaction(data);
            console.log(data);
            if (res) {
                Toast.show({
                    text: res.message,
                    position: 'bottom',
                    type: 'success',
                    duration: 1500,
                });
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
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {results ? (
                <View style={styles.container}>
                    <View style={styles.section1}>
                        <EvilIcons styles={styles.icon} name="search" />
                        <TextInput
                            styles={styles.input}
                            placeholder="Enter stock index here"
                            onChangeText={(event) => setTerm(event)}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: '#ffb347' }}
                            styles={styles.button}
                            title="SEARCH"
                            onPress={() => searchAPI(term)}
                        />
                    </View>
                    <View style={styles.section2}>
                        <Text style={{ margin: 15 }}> {ticker}</Text>
                        <Text style={{ margin: 15 }}> ${results}</Text>
                        <View style={styles.numberOfShares}>
                            <TextInput
                                placeholder="# of shares"
                                style={styles.textInputBox}
                                clearButtonMode="always"
                                type="number"
                                keyboardType="number-pad"
                                value={numberOfShares}
                                onChangeText={(event) =>
                                    setNumberOfShares(event)
                                }
                            ></TextInput>
                        </View>
                        <View style={{ margin: 5 }}>
                            <Button
                                buttonStyle={{ backgroundColor: '#ffb347' }}
                                styles={styles.button}
                                title="BUY"
                                onPress={() =>
                                    handleBuy({
                                        symbol: ticker,
                                        numShares: numberOfShares,
                                        quotePrice: -results,
                                    })
                                }
                            />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Button
                                buttonStyle={{ backgroundColor: '#ffb347' }}
                                title="SELL"
                                onPress={() =>
                                    handleSell({
                                        symbol: ticker,
                                        numShares: numberOfShares,
                                        quotePrice: results,
                                    })
                                }
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                likeCliked({
                                    symbol: term,
                                    currentPrice: results,
                                })
                            }
                        >
                            <Entypo
                                name="add-to-list"
                                size={24}
                                color="black"
                                style={{ marginLeft: 20 }}
                            ></Entypo>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.section1}>
                        <EvilIcons styles={styles.icon} name="search" />
                        <TextInput
                            styles={styles.input}
                            placeholder="Enter stock index here"
                            onChangeText={(event) => setTerm(event)}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: '#ffb347' }}
                            styles={styles.button}
                            title="SEARCH"
                            onPress={() => searchAPI(term)}
                        />
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
    },
    section1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#20232a',
        borderRadius: 6,
        width: 300,
        margin: 15,
        marginTop: 25,
    },

    section2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 100,
    },

    numberOfShares: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#20232a',
        borderRadius: 6,
        width: 78,
        height: 30,
        marginRight: 8,
    },

    input: {
        flex: 6,
        width: 150,
        height: 100,
        borderWidth: 5,
        borderColor: '#20232a',
        borderRadius: 6,
    },
    icon: {
        // flex: 1,
        marginHorizontal: 15,
        fontSize: 50,
        marginHorizontal: 15,
    },
    button: {
        // flex: 1,
        margin: 15,
        color: '#1E6738',
    },
});
