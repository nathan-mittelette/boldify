import { initI18n } from '#lib/services/i18n.service.js';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	await initI18n(params.lang!);
	return { lang: params.lang! };
};
