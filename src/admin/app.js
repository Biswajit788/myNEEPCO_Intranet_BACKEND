// @ts-nocheck
import logo from "./extensions/logo170.gif";

const config = {
 // Replace the Strapi logo in auth (login) views
 auth: {
  logo
 },
 // Replace the favicon
 head: {
  favicon: logo
 },
 // Replace the Strapi logo in the main navigation
 menu: {
  logo
 },

 // Extend the translation
 translations: {
  en: {
    "app.components.LeftMenu.navbrand.title": "MyNEEPCO Intranet",
    "app.components.LeftMenu.navbrand.workplace": "Admin Panel",
    "Auth.form.welcome.title": "Admin Panel",
    "Auth.form.welcome.subtitle": "Login to your account",
    "Settings.profile.form.section.experience.interfaceLanguageHelp":
    "Preference changes will apply only to you.",
  },
 },

 // Disable video tutorials
 tutorials: false,
 // Disavle notifications about new Strapi releases
 notifications: { release: false },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
