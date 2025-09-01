import type { ParamMatcher } from '@sveltejs/kit';

export type SupportedLanguages = 'fr' | 'en';

export const match = ((param: string): param is SupportedLanguages => {
	return param === 'fr' || param === 'en';
}) satisfies ParamMatcher;
