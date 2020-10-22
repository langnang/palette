import { list, insert, del, update, } from '@/api/palette';
import * as palette_data from '@/data/palette';
export default {
    namespaced: true,
    state: {
        _id: 0,
        item: palette_data.item(),
        dialog: {
            visible: false,
            target: "insert",// insert update
            index: null,
        },
        carousel: {
            visible: false,
            index: 0,
        },
        filter: {
            type: "all",
        },
        list: [],
        select: [],
        series: [],
    },
    mutations: {
        SET_LIST(state, list) {
            state.list.splice(0, 0, ...list);
            state._id = list.reduce((total, val) => total > val.id ? total : val.id + 1, state._id);
        },
        setPalette() { },
        setPaletteColor() { },
        setPaletteItem(state, id = undefined) {
            if (id == undefined) {
                state.item = palette_data.item();
            } else {
                state.item = JSON.parse(JSON.stringify(state.list.filter(v => v.id === id)[0]));
                // state.dialog.index = index;
            }
        },
        setPaletteList(state, list) {
            state.list.splice(0, 0, ...list);
            state._id = list.reduce((total, val) => total > val.id ? total : val.id + 1, state._id);
        },
        addPaletteColor(state) {
            state.item.colors.push("");
        }
    },
    getters: {

        palette_active: (state) => (id) => {
            return state.filter(v => v.id === id)[0];
        },
        palette_index: state => id => {
            let i = -1;
            state.list.forEach((palette, index) => {
                if (palette.id == id) {
                    i = index;
                    return;
                }
            });
            return i;
        }
    },
    actions: {
        getList({ commit }) {
            list().then((res) => {
                if (res.data.status == 200) {
                    commit("SET_LIST", res.data.data);
                }
            });
        },
        insertPalette({ state }) {
            insert(state.item)
                .then(res => {
                    if (res.data.status === 200) {
                        this._vm.$message({
                            type: "success",
                            message: "新增成功!",
                        });
                        state.list.push(JSON.parse(JSON.stringify(res.data.data)));
                    } else {
                        this._vm.$message({
                            type: "error",
                            message: "新增失败!",
                        });
                    }
                });
        },
        deletePalette({ state }, index) {
            del(JSON.parse(JSON.stringify(state.list[index])))
                .then(res => {
                    if (res.data.status === 200) {
                        this._vm.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        state.list.splice(index, 1);
                    } else {
                        this._vm.$message({
                            type: "error",
                            message: "删除失败!",
                        });
                    }
                });
        },
        batchDeletePalette({ state },) {
            state.select.forEach(id => {
                for (let i = 0; i <= state.list.length - 1; i++) {
                    if (id === state.list[i].id) {
                        state.list.splice(i, 1);
                    }
                }
            })
            state.select = [];
        },
        updatePalette({ state }) {
            update(JSON.parse(JSON.stringify(state.item)))
                .then(res => {
                    if (res.data.status === 200) {
                        this._vm.$message({
                            type: "success",
                            message: "更新成功!",
                        });
                        state.list.splice(state.dialog.index, 1, JSON.parse(JSON.stringify(res.data.data)));
                    } else {
                        this._vm.$message({
                            type: "error",
                            message: "更新失败!",
                        });
                    }
                })
        },
    }
}