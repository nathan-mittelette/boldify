import type { ParamMatcher } from '@sveltejs/kit';

export type SupportedLanguages = 'fr' | 'en';

// runtime list of supported languages (keeps in sync with the SupportedLanguages type)
export const supportedLanguages: SupportedLanguages[] = ['fr', 'en'];

export const match = ((param: string): param is SupportedLanguages => {
	return supportedLanguages.includes(param as SupportedLanguages);
}) satisfies ParamMatcher;
