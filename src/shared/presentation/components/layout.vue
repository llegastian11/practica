<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import LanguageSwitcher from "./language-switcher.vue";

const { t } = useI18n();
const router = useRouter();

/**
 * Custom logo provider URL for the Open-Meteo brand.
 * @type {string}
 */
const logoUrl = `https://img.logo.dev/open-meteo.com?token=${import.meta.env.VITE_LOGO_DEV_TOKEN}`;
/**
 * Navigation options rendered inside the main application toolbar.
 * @type {Array<{label: string, path: string}>}
 */
const navigationOptions = [
  { label: "option.home", path: "/home" },
  { label: "option.new-report", path: "/weather/reports/new" }
];

/**
 * Navigates the user to the given in-app route.
 * @param {string} path - Target semantic route.
 */
const navigateTo = (path) => {
  router.push(path);
};
</script>