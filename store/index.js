
import * as _ from 'lodash';
export const state = () => ({
    scrollPos: 0,
    scrollInfo: {
        pos: 0,
        size: 10,
        page: 1,
        total: 0
    },
    list: []
});

export const mutations = {
    setScrollPosition(state, pos) {
        state.scrollPos = pos;
    },
    setScrollInfo(state, info) {
        state.scrollInfo = _.cloneDeep(info);
    },
    setList(state, list) {
        state.list = _.cloneDeep(list);
    },
    setCurrentPage(state, page) {
        state.scrollInfo.page = page;
    },
    setTotalCount(state, totalCount) {
        state.scrollInfo.total = totalCount;
    }
};

export const getters = {
    getScrollPosition(state) {
        return state.scrollPos;
    },
    getScrollInfo(state) {
        return state.scrollInfo;
    },
    getList(state) {
        return state.list;
    },
};

export const actions = {
}
