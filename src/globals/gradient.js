import Vue from 'vue';

Vue.prototype.$gradient = function (colors) {//全局函数1
    // console.log(colors);
    // console.log(colors.join());
    // console.log(`linear-gradient(to right, ${colors.join()})`);
    return `linear-gradient(to right, ${colors.join()})`;
};
