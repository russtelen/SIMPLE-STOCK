import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return JSON.parse(token);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const loginUser = async (data) => {
    try {
        const res = await axios({
            method: 'post',
            url: 'https://stealth-simple.herokuapp.com/api/users/login',
            data,
        });

        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const registerUser = async (data) => {
    try {
        const res = await axios({
            method: 'post',
            url: 'https://stealth-simple.herokuapp.com/api/users/register',
            data,
        });
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const logoutUser = async () => {
    try {
        const res = await axios({
            method: 'post',
            url: 'https://stealth-simple.herokuapp.com/api/users/logout',
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

//GET INDIVIDUAL USER
export async function getUser() {
    try {
        const token = await getToken();
        console.log(token);
        const res = await axios({
            method: 'get',
            url: '  https://stealth-simple.herokuapp.com/api/users/financials',
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

//GET Position
export async function getPosition() {
    try {
        const token = await getToken();
        console.log(token);
        const res = await axios({
            method: 'get',
            url: 'https://stealth-simple.herokuapp.com/api/users/portfolio',
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// buy/sell stock
export const stockTransaction = async (data) => {
    try {
        const token = await getToken();
        const res = await axios({
            method: 'post',
            url: 'https://stealth-simple.herokuapp.com/api/transactions',
            headers: { Authorization: `Bearer ${token}` },
            data,
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
