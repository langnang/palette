import { comment as api_comment } from '@/api';
export default {
    namespaced: true,
    state: {
        info: {},
        token: {},
        list: []
    },
    mutations: {
        setCommentList(state, list = []) {
            state.list = list;
        }
    },
    getters: {

    },
    actions: {
        commentInsert({ state, getters, rootState, rootGetters }, comment) {
            if (rootState.user.token === null) {
                this._vm.$alert('用户未登录，请先登录！！！', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: () => {
                    }
                });
            } else {
                api_comment.insert(comment)
                    .then(res => {
                        if (res.data.status === 200) {
                            const index = getters.comment_index(comment.type_id);
                            const palette_index = rootGetters.palette_index(comment.type_id);
                            if (index == -1) {
                                state.list.push({
                                    type: 'palette',
                                    type_id: comment.type_id,
                                    thumbs_up: comment.thumbs_up || 0,
                                    heart: comment.heart || 0,
                                    star: comment.star || 0,
                                })
                            } else {
                                state.list[index].thumbs_up += (comment.thumbs_up || 0);
                                state.list[index].heart += (comment.heart || 0);
                                state.list[index].star += (comment.star || 0);
                            }
                            rootState.palette.list[palette_index].thumbs_up += (comment.thumbs_up || 0);
                            rootState.palette.list[palette_index].heart += (comment.heart || 0);
                            rootState.palette.list[palette_index].star += (comment.star || 0);
                        }
                    })

            }
        },
        commentList({ commit }) {
            api_comment.list().then(res => {
                if (res.data.status === 200) {
                    commit("setCommentList", res.data.data);
                }
            })
        }
    }
}