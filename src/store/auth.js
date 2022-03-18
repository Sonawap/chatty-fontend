import axios from "axios";
export default {
    namespaced: true,
    state: {
        token: null,
        user: "",
        users: "",
        chats: ""
    },

    getters: {
        user(state) {
            return state.user;
        },
        chats(state) {
            return state.chats;
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
        SET_USERIMAGE(state, link) {
            state.user.avatar = link;
        },

        SET_CHATS(state, chats) {
            state.chats = chats;
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

                let chats = await axios.get("user/allChats");
                commit("SET_CHATS", chats.data.chats);
            } catch (e) {
                commit("SET_TOKEN", null);
                commit("SET_USER", "");
            }
        },

        setImage({ commit, state }, imageLink) {
            commit("SET_USERIMAGE", "..");
            commit("SET_USERIMAGE", imageLink);
        },


        signOut({ commit }) {
            return axios.post("user/logout").then(() => {
                commit("SET_TOKEN", null);
                commit("SET_USER", "");
            });
        },
    },
};
