import React from 'react';
import { List } from 'react-native-paper';

const TransactionList = ({ transaction }) => {
    return (
        <>
            {transaction.quotePrice > 0 ? (
                <List.Item
                    title={` ${transaction.symbol} `}
                    description={` SELL   No. of share : ${transaction.numShares}    Price: $${transaction.quotePrice} `}
                />
            ) : (
                <List.Item
                    title={` ${transaction.symbol} `}
                    description={` BUY   No. of share : ${transaction.numShares}    Price: $${transaction.quotePrice}`}
                />
            )}
        </>
    );
};

export default TransactionList;
