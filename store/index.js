
// import * as _ from 'lodash';
export const state = () => ({
    scrollPos: 0
});

export const mutations = {
    setScrollPosition(state, pos) {
        state.scrollPos = pos;
    }
};

export const getters = {
    getScrollPosition(state) {
        return state.scrollPos;
    }
};

export const actions = {
}
