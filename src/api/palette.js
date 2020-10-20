import axios from 'axios';
const key = "palette";
export const is = () => { return window.localStorage.getItem(key) ? true : false; };
export const has = () => { };
export const can = () => { };
export const create = (_list = []) => { window.localStorage.setItem(key, JSON.stringify(_list)); };
export const drop = () => { window.localStorage.removeItem(key); };
export const insert = (item) => {
    return axios.post("/api/palette/insert", { token: {}, palette: item });
};
export const del = (item) => {
    return axios.post("/api/palette/delete", { token: {}, palette: item });
    // const _list = list();
    // _list.splice(index, 1);
    // create(_list);
};
export const update = (item) => {
    return axios.post("/api/palette/update", { token: {}, palette: item });
    // const _list = list();
    // _list.splice(index, 1, item);
    // create(_list);
};
export const list = (token) => {
    if (!token) {
        return axios.get("/api/palette/list");
    }
    return axios.post("/api/palette/list", { token });
};
export const info = (index) => {
    const _list = list();
    return _list[index];
};
export const item = () => { };