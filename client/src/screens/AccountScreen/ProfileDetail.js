import React from 'react';
import { List } from 'react-native-paper';
const ProfileDetail = ({ user }) => {
    return (
        <>
            <List.Item title={`Name: ${user.username}`} />
            <List.Item title={`Account Number: ${user._id}`} />
            <List.Item title={`Email: ${user.email}`} />
        </>
    );
};

export default ProfileDetail;
