// src/configs/i18n/react/i18next.ts
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
function initI18Next(options) {
    return i18next.use(initReactI18next).init(options);
}
export { initI18Next };
