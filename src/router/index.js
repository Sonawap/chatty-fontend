import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          requiresAuth: true,
          title: "Messages",
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Login",
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            title: "Login",
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
