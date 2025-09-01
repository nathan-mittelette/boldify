import { init, locale, register } from 'svelte-i18n';
import type { SupportedLanguages } from '../../params/lang';

// Save available languages
register('en', () => import('../../locales/en.json'));
register('fr', () => import('../../locales/fr.json'));

export const SUPPORTED_LANGUAGES: SupportedLanguages[] = ['en', 'fr'];
const DEFAULT_LANGUAGE: SupportedLanguages = 'fr';

export let isInitialized = false;

// Initialize i18n with default language from browser or user's saved language
export async function initI18n(lang: SupportedLanguages): Promise<void> {
	isInitialized = true;

	await init({
		fallbackLocale: DEFAULT_LANGUAGE,
		initialLocale: lang
	});
}

export { locale };
