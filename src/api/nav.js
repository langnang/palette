import axios from 'axios';
const key = "palette";
export const list = () => {
    return axios.get(`/api/nav/list?type=${key}`);
    // return JSON.parse(window.localStorage.getItem(key));
};