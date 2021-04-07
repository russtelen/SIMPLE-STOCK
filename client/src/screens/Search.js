// import React, { useEffect, useState } from 'react';
// import {
//     Text,
//     TextInput,
//     View,
//     StyleSheet,
//     Button,
//     TouchableOpacity,
// } from 'react-native';
// import finnhub from '../api/Finnub';
// // import { API_KEY } from '@env';
// import { Entypo } from '@expo/vector-icons';
// import { EvilIcons } from '@expo/vector-icons';
// import Constants from 'expo-constants';
// import { API_KEY } from 'dotenv';
// import { addToWatchlist, getUser } from '../network';

// export default function Search() {
//     const [results, setResults] = useState();
//     const [term, setTerm] = useState();
//     const [userWatchList, setUserWatchList] = useState([]);
//     const [isAdded, setIsAdded] = useState(false);

//     //click the like button to add to watchlist
//     const likeCliked = async (data) => {
//         try {
//             const index = userWatchList.findIndex(
//                 (watchList) => watchList.symbol == term
//             );
//             //check if ticker already in the watchlist
//             if (index == -1) {
//                 const res = await addToWatchlist(data);
//                 setIsAdded((prev) => !prev);
//                 alert(res.message);
//                 console.log(isAdded);
//             } else {
//                 alert(`You have already added ${term} i nto the watchlist!`);
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     //fetch user watchlist
//     useEffect(() => {
//         (async () => {
//             const result = await getUser();
//             setUserWatchList(result.user.watchlist);
//         })();
//     }, [isAdded]);

//     const searchAPI = async (data) => {
//         // console.log('term', term);
//         const response = await finnhub.get(
//             `quote?symbol=${data}&token=${API_KEY}`
//         );
//         // console.log('results', results);
//         setResults(response.data.c);
//     };

//     useEffect(() => {
//         // console.log('results', results);
//     }, [results]);

//     return (
//         <>
//             {results ? (
//                 <View style={styles.container}>
//                     <View style={styles.section1}>
//                         <EvilIcons styles={styles.icon} name="search" />
//                         <TextInput
//                             styles={styles.input}
//                             placeholder="Enter stock index here"
//                             onChangeText={(event) => setTerm(event)}
//                         />
//                         <Button
//                             styles={styles.button}
//                             title="SEARCH"
//                             onPress={() => searchAPI(term)}
//                         />
//                     </View>
//                     <View style={styles.section2}>
//                         <Text style={{ margin: 15 }}> ${results}</Text>
//                         <View style={{ margin: 5 }}>
//                             <Button styles={styles.button} title="BUY" />
//                         </View>
//                         <View style={{ margin: 5 }}>
//                             <Button styles={styles.button} title="SELL" />
//                         </View>
//                         <TouchableOpacity
//                             onPress={() =>
//                                 likeCliked({
//                                     symbol: term,
//                                     currentPrice: results,
//                                 })
//                             }
//                         >
//                             <Entypo
//                                 name="add-to-list"
//                                 size={24}
//                                 color="black"
//                                 style={{ marginLeft: 20 }}
//                             >
//                                 <Text style={{ fontSize: 15 }}>
//                                     Add to Watchlist
//                                 </Text>
//                             </Entypo>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             ) : (
//                 <View style={styles.container}>
//                     <View style={styles.section1}>
//                         <EvilIcons styles={styles.icon} name="search" />
//                         <TextInput
//                             styles={styles.input}
//                             placeholder="Enter stock index here"
//                             onChangeText={(event) => setTerm(event)}
//                         />
//                         <Button
//                             styles={styles.button}
//                             title="SEARCH"
//                             onPress={() => searchAPI(term)}
//                         />
//                     </View>
//                 </View>
//             )}
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: Constants.statusBarHeight,
//     },
//     section1: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         borderWidth: 1,
//         borderColor: '#20232a',
//         borderRadius: 6,
//         width: 300,
//         margin: 15,
//         marginTop: 25,
//     },

//     section2: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',

//         width: 300,
//         height: 100,
//     },

//     input: {
//         flex: 6,
//         width: 150,
//         height: 100,
//         borderWidth: 5,
//         borderColor: '#20232a',
//         borderRadius: 6,
//     },
//     icon: {
//         // flex: 1,
//         marginHorizontal: 15,
//         fontSize: 50,
//         marginHorizontal: 15,
//     },
//     button: {
//         // flex: 1,
//         margin: 15,
//     },
// });
import React, { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
} from 'react-native';
import finnhub from '../api/Finnub';
// import { API_KEY } from '@env';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { API_KEY } from 'dotenv';
import { addToWatchlist, getUser, deleteWatchlist } from '../network';

export default function Search() {
    const [results, setResults] = useState();
    const [term, setTerm] = useState();
    const [userWatchList, setUserWatchList] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    // fetch user watchlist
    useEffect(() => {
        (async () => {
            const result = await getUser();
            setUserWatchList(result.user.watchlist);
        })();
    }, [isAdded]);

    //fetch current price from finnhib
    const searchAPI = async (data) => {
        const response = await finnhub.get(
            `quote?symbol=${data}&token=${API_KEY}`
        );
        setResults(response.data.c);

        //check if ticker already in the watchlist
        const index = userWatchList.findIndex(
            (watchList) => watchList.symbol == term
        );
        if (index !== -1) {
            setIsAdded(true);
        } else {
            setIsAdded(false);
        }
    };

    useEffect(() => {}, [results]);

    //click the like button to add to watchlist
    const addCliked = async (data) => {
        try {
            // if ticker has not been added  -> add to watchlist
            if (isAdded == false) {
                const res = await addToWatchlist(data);
                if (res) alert(res.message);
            } else {
                alert('have been deleted only watchlist');
                // const deleteRes = await deleteWatchlist({
                //     symbol: term,
                // stockId: w._id,
                // });
            }
            setIsAdded((prev) => !prev);
        } catch (e) {
            console.log(e);
        }
    };

    // const newWatchlist = userWatchList.filter(function (w) {
    //     if (term) {
    //         return w.symbol == term;
    //     }
    // });

    // console.log(newWatchlist);
    // newWatchlist.map((w) => <Text>{w._id}</Text>);

    // const watchlistIterator = newWatchlistId.values();
    // for (const value of watchlistIterator) {
    //     // setStockId(value);
    //     // console.log(stockId);
    //     return value;
    // }

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
                            styles={styles.button}
                            title="SEARCH"
                            onPress={() => searchAPI(term)}
                        />
                    </View>
                    <View style={styles.section2}>
                        <Text style={{ margin: 15 }}> ${results}</Text>
                        <View style={{ margin: 5 }}>
                            <Button styles={styles.button} title="BUY" />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Button styles={styles.button} title="SELL" />
                        </View>

                        <TouchableOpacity
                            onPress={() =>
                                addCliked({
                                    symbol: term,
                                    currentPrice: results,
                                    // stockId: w._id,
                                })
                            }
                        >
                            {isAdded ? (
                                <AntDesign
                                    name="heart"
                                    size={24}
                                    color="#f42f4c"
                                    style={{ marginLeft: 20 }}
                                />
                            ) : (
                                <AntDesign
                                    name="hearto"
                                    size={24}
                                    color="#f42f4c"
                                    style={{ marginLeft: 20 }}
                                />
                            )}
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
        alignItems: 'flex-start',
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

    input: {
        flex: 6,
        width: 150,
        height: 100,
        borderWidth: 5,
        borderColor: '#20232a',
        borderRadius: 6,
    },
    icon: {
        marginHorizontal: 15,
        fontSize: 50,
        marginHorizontal: 15,
    },
    button: {
        margin: 15,
    },
});
