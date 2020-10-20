import axios from 'axios';
import store from '@/store';
export const sign_in = (user) => {
    return axios.post(`/api/user/sign-in`, user);
    // return JSON.parse(window.localStorage.getItem(key));
};

export const sign_out = () => {
    return axios.post(`/api/user/sign-out`, {
        token: store.state.user.token,
    });
    // return JSON.parse(window.localStorage.getItem(key));
};

export const info = (token) => {
    return axios.post(`/api/user/info`, { token });
    // return JSON.parse(window.localStorage.getItem(key));
};