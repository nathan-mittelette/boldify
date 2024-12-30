import type { LayoutLoad } from './$types';
import { initI18n } from '$lib/services/i18n.service';

export const prerender = true;

export const load: LayoutLoad = async () => {
	await initI18n();
};
