import axios from "axios";
export default {
    namespaced: true,
    state: {
        token: null,
        user: "",
        users: "",
    },

    getters: {
        user(state) {
            return state.user;
        },
        users(state) {
            return state.users;
        },

        course_id(state) {
            return state.course_id;
        },
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_USERS(state, users) {
            state.users = users;
        },
    },

    actions: {
        async attempt({ commit, state }, token) {
            if (token) {
                commit("SET_TOKEN", token);
            }
            if (!state.token) {
                return;
            }
            try {
                let response = await axios.get("user");
                commit("SET_USER", response.data.user);

                let users = await axios.get("users");
                commit("SET_USERS", users.data.users);
            } catch (e) {
                commit("SET_TOKEN", null);
                commit("SET_USER", "");
            }
        },


        signOut({ commit }) {
            return axios.post("user/logout").then(() => {
                commit("SET_TOKEN", null);
                commit("SET_USER", "");
            });
        },
    },
};
