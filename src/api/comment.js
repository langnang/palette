import axios from 'axios';
import store from '@/store';
const key = "palette";
export const insert = (comment) => {
    return axios.post(`/api/comment/insert`, {
        token: store.state.user.token,
        comment: { type: key, ...comment }
    });
    // return JSON.parse(window.localStorage.getItem(key));
};
export const list = () => {
    return axios.post(`/api/comment/list`, {
        token: store.state.user.token,
        comment: { type: key }
    });
}