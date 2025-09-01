import { SUPPORTED_LANGUAGES } from '$lib/services/i18n.service';

export const entries = async () => {
	return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
};
