import { palette } from '@/api';
console.log(palette);
export default {
    state: {
        item: {
            type: "single",// single,gradient,multi,
            colors: [""],
            name: ""
        },
        dialog: {
            visible: false,
            target: "insert",// insert update
            index: null,
        },
        carousel: {
            visible: false,
            index: 0,
        },
        list: [
            {
                type: "single",
                colors: ["#000000"],
                name: "Black"
            },
            {
                type: "gradient",
                colors: ["#1c92d2", "#f2fcfe"],
                name: "Telegram"
            },
            {
                type: "multi",
                colors: ["red", "orange", "yellow", "green", "blue", "indigo", "violet"],
                name: "太阳七色"
            },
        ],
        select: [],
    },
    mutations: {
        setPaletteItem(state, index = undefined) {
            if (index == undefined) {
                state.item = {
                    type: "single",
                    colors: [""],
                    name: ""
                };
            } else {
                state.item = JSON.parse(JSON.stringify(state.list[index]));
                state.dialog.index = index;
            }
        },
        setPaletteList(state, payload) {
            console.log(payload);
            state.list = payload;
        },
        addPaletteColor(state) {
            state.item.colors.push("");
        }
    },
    getters: {
    },
    actions: {
        insertPalette({ state }) {
            state.list.push(JSON.parse(JSON.stringify(state.item)));
            palette.insert(state.item);
        },
        deletePalette({ state }, index) {
            state.list.splice(index, 1);
            palette.del(index);
        },
        updatePalette({ state }) {
            state.list.splice(state.dialog.index, 1, JSON.parse(JSON.stringify(state.item)));
            palette.update(state.dialog.index, JSON.parse(JSON.stringify(state.item)));
        },
    }
}