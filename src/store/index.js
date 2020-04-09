import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: {
      "pure": {
        "name": "Pure Colors",
        "list": [
        ]
      },
      refs: {
        list: []
      }
    }
  },
  mutations: {
  },
  getters: {
    colors: state => {
      let _res = {};
      for (let key in state.colors) {
        console.log(key);
        if (key !== 'refs') {
          _res[key] = state.colors[key];
        }
      }
      return _res;
    },
  },
  actions: {
    loadMenu({ state }) {
      this._vm.$axios
        .get(
          "https://raw.githubusercontent.com/langnang/public-resources/master/json/colors/index.json"
        )
        .then(res => {
          console.log(this);
          console.log(state);
          if (res.status === 200) {
            console.log(res.data);
            state.colors = res.data;
          }
        });
    }
  },
})
