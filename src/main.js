import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import i18n from "./i18n.js";
import router from "./router.js";
import pinia from "./pinia.js";

import PrimeVue from "primevue/config";
import Material from "@primeuix/themes/material";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

import {
    Button,
    Card,
    Column,
    Select,
    SelectButton,
    Toolbar
} from "primevue";

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(pinia);
app.use(PrimeVue, { theme: { preset: Material }, ripple: true });

app.component("pv-button", Button);
app.component("pv-card", Card);
app.component("pv-column", Column);
app.component("pv-select", Select);
app.component("pv-select-button", SelectButton);
app.component("pv-toolbar", Toolbar);

app.mount("#app");