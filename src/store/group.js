import axios from "axios";
export default {
    namespaced: true,
    state: {
        groups: '',
    },

    getters: {
        groups(state) {
            return state.groups;
        },
    },

    mutations: {
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
    },

    actions: {
        async getGroups({ commit }) {
            let response = await axios.get("user/belongToGroups");
            commit("SET_GROUPS", response.data.groups);
        },
    },
};
