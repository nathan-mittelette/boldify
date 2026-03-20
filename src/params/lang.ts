import type { ParamMatcher } from '@sveltejs/kit';

export type SupportedLanguages = 'fr' | 'en' | 'es' | 'pt' | 'de' | 'tr' | 'pl';

// runtime list of supported languages (keeps in sync with the SupportedLanguages type)
export const supportedLanguages: SupportedLanguages[] = ['fr', 'en', 'es', 'pt', 'de', 'tr', 'pl'];

export const match = ((param: string): param is SupportedLanguages => {
	return supportedLanguages.includes(param as SupportedLanguages);
}) satisfies ParamMatcher;
