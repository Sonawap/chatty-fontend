import axios from "axios";
export default {
    namespaced: true,
    state: {
        messages: '',
        chat: '',
        type: '',
    },

    getters: {
        chat(state) {
            return state.chat;
        },
        messages(state) {
            return state.messages;
        },
        type(state) {
            return state.type;
        },
    },


    mutations: {
        SET_MESSAGES(state, messages) {
            state.messages = messages;
        },
        SET_CHAT(state, chat) {
            state.chat = chat;
        },
        SET_TYPE(state, type) {
            state.type = type;
        },
    },

    actions: {

        async setGroupChat({ commit }, _group) {
            try {
                let response = await axios
                    .get("chat/group", {
                        params: {
                          group_id: _group.id
                        }
                    });
                commit("SET_MESSAGES", response.data.chat);
                commit("SET_CHAT", _group);
                commit("SET_TYPE", 'Group');
            } catch (e) {
                commit("SET_CHAT", null);
            }
        },

        async setChats({ commit }, chat) {
            try {
                let data = {
                    'chat_id': chat.id,
                    'type': chat.model,
                    'chatter' : chat.object.id
                }
                let response = await axios.post("chat/direct", data);
                commit("SET_MESSAGES", response.data.chat);
                commit("SET_CHAT", chat.object);
                commit("SET_TYPE", chat.model);
            } catch (e) {
                commit("SET_CHAT", null);
            }
        },
    },

};
