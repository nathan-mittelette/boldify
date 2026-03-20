import { init, locale, register } from 'svelte-i18n';
import type { SupportedLanguages } from '../../params/lang';

// Save available languages
register('en', () => import('../../locales/en.json'));
register('fr', () => import('../../locales/fr.json'));
register('es', () => import('../../locales/es.json'));
register('pt', () => import('../../locales/pt.json'));
register('de', () => import('../../locales/de.json'));
register('tr', () => import('../../locales/tr.json'));
register('pl', () => import('../../locales/pl.json'));

export const SUPPORTED_LANGUAGES: SupportedLanguages[] = ['en', 'fr', 'es', 'pt', 'de', 'tr', 'pl'];
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
