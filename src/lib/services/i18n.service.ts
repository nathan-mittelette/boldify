import { browser } from '$app/environment';
import { getLocaleFromNavigator, init, locale, register } from 'svelte-i18n';

// Save available languages
register('en', () => import('../../locales/en.json'));
register('fr', () => import('../../locales/fr.json'));

export const SUPPORTED_LANGUAGES = ['en', 'fr'];
const DEFAULT_LANGUAGE = 'fr';
const LOCAL_STORAGE_KEY = 'boldify-language';

// Detect language from browser or use default
function getValidLanguage() {
	const browserLanguage = getLocaleFromNavigator(); // Language from browser (ex: "en-US")
	if (!browserLanguage) return DEFAULT_LANGUAGE; // Default 'en'
	const shortLanguage = browserLanguage.split('-')[0]; // Only keep first part (ex: "en")
	return SUPPORTED_LANGUAGES.includes(shortLanguage) ? shortLanguage : DEFAULT_LANGUAGE; // Default 'en'
}

// Initialize i18n with default language from browser or user's saved language
export async function initI18n(): Promise<void> {
	// For SSR, initialize with default language
	if (!browser) {
		await init({
			fallbackLocale: DEFAULT_LANGUAGE,
			initialLocale: DEFAULT_LANGUAGE
		});
		return;
	}

	const savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY); // Saved language
	const initialLanguage = savedLanguage || getValidLanguage(); // Use saved language or browser language
	await init({
		fallbackLocale: DEFAULT_LANGUAGE,
		initialLocale: initialLanguage
	});

	// Automatically save user's language preference
	locale.subscribe((value) => {
		if (value) {
			localStorage.setItem(LOCAL_STORAGE_KEY, value);
		}
	});
}

export { locale };
