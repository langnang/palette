import Vue from 'vue';
import store from '@/store';

Vue.prototype.$func = {
    comment: {
        thumbsUp: (id) => {
            console.log(id);
            console.log(store);
        },
        star: (id) => {
            console.log(id);
        },
        heart: (id) => {
            console.log(id);
        },
    },
    palette: {
        gradient: (colors) => {
            return `linear-gradient(to right, ${colors.join()})`;
        },
    },
    user: {
        sign_in: () => { },
        sign_out: () => { },
        info: () => { },
    }
}

Vue.prototype.$res = (res) => {//全局函数1
    console.log(res);
};
