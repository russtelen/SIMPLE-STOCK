import React, { useState, useEffect } from 'react';
import { List } from 'react-native-paper';
import { API_KEY } from '@env';
import finnhub from '../../api/Finnub';
import { AntDesign } from '@expo/vector-icons';
import { deleteWatchlist } from '../../network';

const WatchList = ({ watchlist }) => {
    const [currentPrice, setCurrentPrice] = useState('');
    const [isAdded, setIsAdded] = useState(true);

    //fetch current price
    useEffect(() => {
        (async () => {
            try {
                const response = await finnhub.get(
                    `quote?symbol=${watchlist.symbol}&token=${API_KEY}`
                );
                setCurrentPrice(response.data.c);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [currentPrice]);

    //click the like button to add to watchlist
    const addCliked = async (stockId) => {
        try {
            if (isAdded == true) {
                console.log(stockId);
                const res = await deleteWatchlist(stockId);
                console.log(res);
                res ? alert(res.message) : null;
            }
            setIsAdded((prev) => !prev);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {isAdded ? (
                <List.Item
                    title={watchlist.symbol}
                    description={` current price  $${currentPrice} `}
                    right={() => (
                        <AntDesign
                            name="heart"
                            size={24}
                            color="#f42f4c"
                            style={{ margin: '2%' }}
                            onPress={() => addCliked(watchlist._id)}
                        ></AntDesign>
                    )}
                />
            ) : (
                <List.Item
                    title={watchlist.symbol}
                    description={` current price  $${currentPrice} `}
                    right={() => (
                        <AntDesign
                            name="hearto"
                            size={24}
                            color="#f42f4c"
                            style={{ margin: '2%' }}
                            onPress={addCliked}
                        ></AntDesign>
                    )}
                />
            )}
        </>
    );
};
export default WatchList;
