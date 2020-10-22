import { user as api_user } from '@/api';
import router from '@/router';
export default {
    namespaced: true,
    state: {
        info: null,
        token: null,
    },
    mutations: {
        setUser(state, payload = null) {
            state.info = payload;
        },
        setUserToken(state, payload = null) {
            state.token = payload;
            window.localStorage.setItem("token", JSON.stringify(payload));
        },
    },
    getters: {

    },
    actions: {
        signIn({ commit, dispatch }, payload) {
            api_user.sign_in(payload)
                .then(res => {
                    if (res.data.status === 200) {
                        this._vm.$notify({
                            type: "success",
                            title: "Success",
                            message: "登陆成功",
                        });
                        commit("setUser", res.data.data.user);
                        commit("setUserToken", res.data.data.token);
                        dispatch("commentList");
                        router.push("/");
                    } else {
                        this._vm.$notify({
                            type: "error",
                            title: "Error",
                            message: "登陆失败",
                        });

                    }
                })
        },
        signOut({ commit }) {
            api_user.sign_out()
                .then(res => {
                    if (res.data.status === 200) {
                        this._vm.$notify({
                            type: "success",
                            title: "Success",
                            message: "登出成功",
                        });
                        commit("setUser");
                        commit("setUserToken");
                        commit("setCommentList");
                        window.localStorage.removeItem("token");
                        router.push("/");
                    } else {
                        this._vm.$notify({
                            type: "error",
                            title: "Error",
                            message: "登出失败",
                        });

                    }
                })
        },
        getInfo({ commit, dispatch }, payload) {
            api_user.info(payload)
                .then(res => {
                    if (res.data.status === 200) {
                        this._vm.$notify({
                            type: "success",
                            title: "Success",
                            message: "自动登陆成功",
                        });
                        commit("setUser", res.data.data.user);
                        commit("setUserToken", payload);
                        dispatch("commentList");
                    } else {
                        this._vm.$notify({
                            type: "error",
                            title: "Error",
                            message: "自动登陆失败",
                        });
                        window.localStorage.removeItem("token");
                    }
                })
        }
    }
}