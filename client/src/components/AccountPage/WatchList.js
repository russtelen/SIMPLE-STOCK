import React, { useState, useEffect } from 'react';
import { List } from 'react-native-paper';
import { API_KEY } from 'dotenv';
import finnhub from '../../api/Finnub';
import { AntDesign } from '@expo/vector-icons';
import { addToWatchlist } from '../../network';

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
    const addCliked = async () => {
        try {
            if (isAdded == true) {
                alert('have been deleted only watchlist');
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
                            onPress={addCliked}
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
