import type { LayoutLoad } from './$types';
import { initI18n, SUPPORTED_LANGUAGES } from '#lib/services/i18n.service.js';
import type { SupportedLanguages } from '../params/lang';
export const prerender = true;
export const load: LayoutLoad = async ({ url }) => {
	const segment = url.pathname.split('/')[1] as SupportedLanguages;
	await initI18n(SUPPORTED_LANGUAGES.includes(segment) ? segment : 'fr');
};
