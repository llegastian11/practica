import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

/**
 * @summary Internationalization engine configuration for the platform.
 * @description Registers English and Spanish message catalogs, English being the default locale.
 * @author Sebastian Reyes Limo
 */
const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en, es }
});

export default i18n;