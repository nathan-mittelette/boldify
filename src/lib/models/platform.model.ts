import { supportedLanguages, type SupportedLanguages } from '../../params/lang.ts';

export type Platform = 'linkedin' | 'x';
export type TextFormat = 'bold' | 'italic' | 'strike' | 'underline' | 'overline';

interface PlatformConfig {
	name: string;
	theme: Platform;
	formats: readonly TextFormat[];
	limit: number;
	counting: 'utf16' | 'twitter';
	i18n: 'editor' | 'x';
	home: (language: string) => `/${string}`;
}

export const X_SECTIONS = ['about', 'how-it-works', 'help', 'mcp'] as const;
export type XSection = (typeof X_SECTIONS)[number];

export const X_LANGUAGES = supportedLanguages;
export const platforms: Record<Platform, PlatformConfig> = {
	linkedin: {
		name: 'LinkedIn',
		theme: 'linkedin',
		formats: ['bold', 'italic', 'underline', 'strike', 'overline'],
		limit: 3000,
		counting: 'utf16',
		i18n: 'editor',
		home: (language) => (language === 'fr' ? '/' : `/${language}`)
	},
	x: {
		name: 'X',
		theme: 'x',
		formats: ['bold', 'italic', 'strike'],
		limit: 280,
		counting: 'twitter',
		i18n: 'x',
		home: (language) =>
			language === 'fr'
				? '/x'
				: `/${supportedLanguages.includes(language as SupportedLanguages) ? language : 'en'}/x`
	}
};

export function platformFromPath(path: string): Platform {
	const segments = path.split('/').filter(Boolean);
	if (supportedLanguages.includes(segments[0] as SupportedLanguages)) segments.shift();
	return segments[0] === 'x' &&
		(segments.length === 1 ||
			(segments.length === 2 && X_SECTIONS.some((section) => section === segments[1])))
		? 'x'
		: 'linkedin';
}

/** The section shared by both platform trees, excluding the locale and platform segments. */
export function sectionFromPath(path: string): XSection | undefined {
	const last = path.replace(/\/$/, '').split('/').at(-1);
	return X_SECTIONS.find((section) => section === last);
}

export function platformUrl(
	platform: Platform,
	language: string,
	section?: XSection
): `/${string}` {
	const home = platforms[platform].home(language);
	if (!section) return home;
	return platform === 'x' ? `${home}/${section}` : `/${language}/${section}`;
}

export function xAlternates(section?: XSection) {
	return [
		...X_LANGUAGES.map((lang) => ({
			lang,
			url: `https://boldify.net${platformUrl('x', lang, section)}`
		})),
		{ lang: 'x-default', url: `https://boldify.net${platformUrl('x', 'fr', section)}` }
	];
}
