import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loading: true,
      loading_text: "页面加载中..."
    },
    colors: {
    },
  },
  mutations: {
    setColors(state, payload) {
      state.colors = payload;
    },
    setLoading(state, payload) {
      state.user.loading = payload;
    },
    setLoadingText(state, payload) {
      state.user.loading_text = payload;
    },
    pushColorsChild(state, payload) {
      if (!state.colors[payload.key].children) {
        state.colors[payload.key].children = [];
      }
      state.colors[payload.key].children.push(payload.child);
    },
    setColorsChildren(state, payload) {
      state.colors[payload.type].children[payload.key].children = payload.children;
    }
  },
  getters: {
    colors: state => {
      let _res = {};
      for (let key in state.colors) {
        if (key !== 'refs') {
          _res[key] = state.colors[key];
        }
      }
      return _res;
    },
    refs: state => state.colors.refs && state.colors.refs.children ? state.colors.refs.children._.children : [],
    single: state => key => {
      if (!state.colors.single) {
        return {
          name: "Single Color",
          title: "",
          children: []
        };
      }
      return state.colors.single.children[key];
    }
  },
  actions: {
    async loadMenu({ commit }) {
      return this._vm.$axios
        .get("https://api.github.com/repos/langnang/colors/issues/1")
        .then(res => {
          if (res.status === 200) {
            const _color = JSON.parse(res.data.body.replace(/```json|```/g, ""));
            commit("setColors", _color);
            commit("setLoading", false);
          }
        })
        .catch(() => {
          commit("setLoading", true);
          commit("setLoadingText", "页面加载失败，请刷新重试！！！");
        })
    },
    async loadChildren({ state, commit, dispatch }, payload) {
      await dispatch('loadMenu');
      let _type = payload.type;
      let _key = payload.key;
      if (state.colors[_type]) {
        Promise.all(state.colors[_type].children[_key].numbers.map(v => {
          return new Promise((resolve, reject) => {
            this._vm.$axios
              .get(`https://api.github.com/repos/langnang/colors/issues/${v}`)
              .then(res => {
                if (res.status === 200) {
                  resolve(JSON.parse(res.data.body.replace(/```json|```/g, "")));
                } else {
                  reject()
                }
              })
          })
        })).then(_res => {
          let _children = _res.reduce((total, value) => [...total, ...value]);
          commit("setColorsChildren", { type: _type, key: _key, children: _children });
        })
          .catch(() => {
            console.log("Error");
          })
      }
    }
  },
})
