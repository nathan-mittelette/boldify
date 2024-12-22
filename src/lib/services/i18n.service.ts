import { getLocaleFromNavigator, init, locale, register } from 'svelte-i18n';

// Enregistrer les langues disponibles
register('en', () => import('../../locales/en.json'));
register('fr', () => import('../../locales/fr.json'));

// Liste des langues supportées
export const SUPPORTED_LANGUAGES = ['en', 'fr'];
const DEFAULT_LANGUAGE = 'en';
const LOCAL_STORAGE_KEY = 'boldify-language';

// Fonction pour obtenir la langue du navigateur si elle est supportée
function getValidLanguage() {
	const browserLanguage = getLocaleFromNavigator(); // Langue du navigateur (ex: "en-US")
	if (!browserLanguage) return DEFAULT_LANGUAGE; // Par défaut 'en'
	const shortLanguage = browserLanguage.split('-')[0]; // Raccourci (ex: "en")
	return SUPPORTED_LANGUAGES.includes(shortLanguage) ? shortLanguage : DEFAULT_LANGUAGE; // Par défaut 'en'
}

// Initialisation avec gestion de localStorage et du navigateur
export async function initI18n(): Promise<void> {
	const savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY); // Langue sauvegardée
	const initialLanguage = savedLanguage || getValidLanguage(); // Utiliser localStorage ou détecter
	await init({
		fallbackLocale: 'en',
		initialLocale: initialLanguage
	});

	// Sauvegarder automatiquement dans localStorage
	locale.subscribe((value) => {
		if (value) {
			localStorage.setItem(LOCAL_STORAGE_KEY, value);
		}
	});
}

// Exporter `locale` pour utilisation dans l'application
export { locale };
