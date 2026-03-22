import { SUPPORTED_LANGUAGES } from '$lib/services/i18n.service';

export function buildHreflang(path: string): { lang: string; url: string }[] {
	return SUPPORTED_LANGUAGES.map((lang) => ({
		lang,
		url: `https://boldify.net/${lang}${path}`
	}));
}

export function buildHomeHreflang(): { lang: string; url: string }[] {
	return SUPPORTED_LANGUAGES.map((lang) => ({
		lang,
		url: lang === 'fr' ? 'https://boldify.net/' : `https://boldify.net/${lang}`
	}));
}
