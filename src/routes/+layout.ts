import type { LayoutLoad } from './$types';
import { initI18n, isInitialized } from '$lib/services/i18n.service';

export const prerender = true;

export const load: LayoutLoad = async () => {
	// Fallback to french if not already defined by another layout
	if (!isInitialized) {
		await initI18n('fr');
	}
};
