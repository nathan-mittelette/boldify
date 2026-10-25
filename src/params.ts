import { defineParams } from '@sveltejs/kit/params';
import { X_SECTIONS } from './lib/models/platform.model.ts';

import { supportedLanguages, type SupportedLanguages } from './params/lang.ts';

const matchLang = (param: string): param is SupportedLanguages => {
	return supportedLanguages.includes(param as SupportedLanguages);
};

export const params = defineParams({
	lang: (param) => (matchLang(param) ? param : undefined),
	xsection: (param) => X_SECTIONS.find((section) => section === param)
});
