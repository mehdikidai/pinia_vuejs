import { createRouter, createWebHistory } from "vue-router";
import AdminView from "@/views/AdminView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "admin",
            component: AdminView,
            beforeEnter: (to, from, next) => {
                next({ name: "login" });
            },
        },
        {
            path: "/login",
            name: "login",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/LoginView.vue"),
        },
    ],
});

export default router;
