import axios from "axios";
export default {
    namespaced: true,
    state: {
        groups: '',
        public_groups: ''
    },

    getters: {
        groups(state) {
            return state.groups;
        },
        public_groups(state) {
            return state.public_groups;
        },
    },

    mutations: {
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
        SET_NOT_GROUPS(state, groups) {
            state.public_groups = groups;
        },
    },

    actions: {
        async getGroups({ commit }) {
            let response = await axios.get("user/belongToGroups");
            commit("SET_GROUPS", response.data.groups);
        },

        async getOtherGroups({ commit }) {
            let response = await axios.get("user/notbelongToGroups");
            commit("SET_NOT_GROUPS", response.data.groups);
        },
    },
};
