// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: ["@element-plus/nuxt", "@nuxtjs/i18n"],
	elementPlus: {
		/** Options */
	},
	ssr: false,
	i18n: {
		locales: [
			{ code: "ru", name: "Русский", file: "ru.json" },
			{ code: "en", name: "English", file: "en.json" },
			{ code: "fr", name: "Français", file: "fr.json" },
		],
		defaultLocale: "ru",
	},
	typescript: {
		typeCheck: true,
		strict: false,
	},
})
