const getters = {
    user: state => state.user.info,
    palette_list: (state) => {
        if (state.palette.filter.type == 'all') {
            return state.palette.list;
        } else {
            return state.palette.list.filter(v => v.type === state.palette.filter.type);
        }
    },
    comment_info: state => type_id => {
        return state.comment.list.filter(v => v.type_id == type_id)[0]
    },
    comment_index: state => type_id => {
        let i = -1;
        state.comment.list.forEach((comment, index) => {
            if (comment.type_id == type_id) {
                i = index;
                return;
            }
        });
        return i;
    }
}
export default getters
