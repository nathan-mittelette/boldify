import { redirect } from '@sveltejs/kit';
import { X_SECTIONS, X_LANGUAGES } from '#lib/models/platform.model.js';
import type { PageLoad } from './$types';
export const entries = () =>
	X_LANGUAGES.flatMap((lang) => X_SECTIONS.map((section) => ({ lang, section })));
export const load: PageLoad = ({ params }) => {
	if (params.lang === 'fr') redirect(308, `/x/${params.section}`);
};
