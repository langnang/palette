import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters';
import palette from './modules/palette';
import user from './modules/user';
import comment from './modules/comment';

import api from '@/api';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    palette,
    user,
    comment,
  },
  state: {
    // user: {
    //   loading: false,
    //   loading_spinner: "",
    //   loading_text: "页面加载中..."
    // },
    colors: {
    },
    navs: [],
  },
  mutations: {
    SET_NAVS(state, payload) {
      state.navs = payload;
    },
    setColors(state, payload) {
      state.colors = payload;
    },
    setLoading(state, payload) {
      state.user.loading = payload;
    },
    setLoadingText(state, payload) {
      state.user.loading_text = payload;
    },
    setLoadingSpinner(state, payload) {
      state.user.loading_spinner = payload;
    },
    pushColorsChild(state, payload) {
      if (!state.colors[payload.key].children) {
        state.colors[payload.key].children = [];
      }
      state.colors[payload.key].children.push(payload.child);
    },
    setColorsChildren(state, payload) {
      state.colors[payload.type].children[payload.key].children = payload.children;
    },

  },
  getters,
  actions: {
    getNavs({ commit }) {
      api.nav.list().then((res) => {
        if (res.data.status == 200) {
          commit("SET_NAVS", res.data.data.children);
        }
      });
    }
    // async loadMenu({ commit }) {
    //   return this._vm.$axios
    //     .get("https://api.github.com/repos/langnang/Palette/issues/1")
    //     .then(res => {
    //       if (res.status === 200) {
    //         const _color = JSON.parse(res.data.body.replace(/```json|```/g, ""));
    //         commit("setColors", _color);
    //         commit("setLoading", false);
    //       }
    //     }).catch(() => {
    //       // commit("setLoading", true);
    //       commit("setLoadingText", "页面加载失败，请刷新重试！！！");
    //       commit("setLoadingSpinner", "el-icon-close");
    //     })
    // },
    // async loadChildren({ state, commit, dispatch }, payload) {
    //   if (!state.colors[_type]) {
    //     await dispatch('loadMenu');
    //   }
    //   let _type = payload.type;
    //   let _key = payload.key;
    //   if (state.colors[_type]) {
    //     Promise.all(state.colors[_type].children[_key].numbers.map(v => {
    //       return new Promise((resolve, reject) => {
    //         this._vm.$axios
    //           .get(`https://api.github.com/repos/langnang/Palette/issues/${v}`)
    //           .then(res => {
    //             if (res.status === 200) {
    //               resolve(JSON.parse(res.data.body.replace(/```json|```/g, "")));
    //             } else {
    //               reject()
    //             }
    //           })
    //       })
    //     })).then(_res => {
    //       let _children = _res.reduce((total, value) => [...total, ...value]);
    //       commit("setColorsChildren", { type: _type, key: _key, children: _children });
    //     })
    //   }
    // },
  },
})
