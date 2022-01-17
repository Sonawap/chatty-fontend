import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from "axios";
import swal from "sweetalert2";

import "./assets/libs/jquery/jquery.min";
import "./assets/libs/bootstrap/js/bootstrap.bundle.min";
import "./assets/libs/simplebar/simplebar.min.js";
import "./assets/libs/node-waves/waves.min.js";
import "./assets/libs/magnific-popup/jquery.magnific-popup.min.js";
import "./assets/libs/owl.carousel/owl.carousel.min.js";
import "./assets/js/pages/index.init.js";
import "./assets/js/app.js";

import 'remixicon/fonts/remixicon.css';

// axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.baseURL = "https://chatty.codeitmi.com.ng/api/";

import NProgress from "nprogress";
import "../node_modules/nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

// Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        var authUser = store.getters["auth/user"];
        if (authUser) {
            next();
        } else {
            swal.fire(
                "Authentication failed!",
                "Please Login or Create an account to continue",
                "error",
            );
            next({ name: "Login" });
        }
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
});

router.afterEach(() => {
    NProgress.done();
});

require("./store/subscribe");

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
    createApp(App)
        .use(store)
        .use(router)
        .mount('#app')
});


