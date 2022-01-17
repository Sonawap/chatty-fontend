import { createStore } from "vuex";
import auth from "./auth";
import group from "./group";
import chat from "./chat";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        group,
        chat,
    },
});
