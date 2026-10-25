import { redirect } from '@sveltejs/kit';
import { X_LANGUAGES } from '#lib/models/platform.model.js';
import type { PageLoad } from './$types';
export const entries = () => X_LANGUAGES.map((lang) => ({ lang }));
export const load: PageLoad = ({ params }) => {
	if (params.lang === 'fr') redirect(308, '/x');
};
