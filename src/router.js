import { createRouter, createWebHistory } from "vue-router";
import stationsRoutes from "./stations/presentation/stations-routes.js";

const home = () => import("./shared/presentation/views/home.vue");
const pageNotFound = () => import("./shared/presentation/views/page-not-found.vue");

const routes = [
    { path: "/home", name: "home", component: home, meta: { title: "Home" } },
    { path: "/weather", children: stationsRoutes },
    { path: "/", redirect: "/home" },
    { path: "/:pathMatch(.*)*", name: "not-found", component: pageNotFound, meta: { title: "Page Not Found" } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to) => {
    const baseTitle = "Open-Meteo Weather Monitoring Platform";
    document.title = `${baseTitle} - ${to.meta.title}`;
});

export default router;