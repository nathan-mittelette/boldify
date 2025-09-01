import { initI18n } from '$lib/services/i18n.service';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	await initI18n(params.lang || 'fr');
	return { lang: params.lang };
};
