import { describe, expect, it } from 'vitest';
import { X_LANGUAGES, platformFromPath, platformUrl, xAlternates } from './platform.model';
import { SUPPORTED_LANGUAGES } from '../services/i18n.service';
import fr from '../../locales/fr.json';
import en from '../../locales/en.json';
import es from '../../locales/es.json';
import pt from '../../locales/pt.json';
import de from '../../locales/de.json';
import tr from '../../locales/tr.json';
import pl from '../../locales/pl.json';

const translations = { fr, en, es, pt, de, tr, pl };
function leaves(value: unknown, path = ''): Record<string, string> {
	if (typeof value === 'string') return { [path]: value };
	return Object.fromEntries(
		Object.entries(value as object).flatMap(([key, child]) =>
			Object.entries(leaves(child, `${path}.${key}`))
		)
	);
}

describe('X language parity with LinkedIn', () => {
	it('uses the same available languages', () => {
		expect(new Set(X_LANGUAGES)).toEqual(new Set(SUPPORTED_LANGUAGES));
	});
	for (const lang of X_LANGUAGES) {
		it(`has complete translated editor, documentation and SEO content for ${lang}`, () => {
			const messages = leaves(translations[lang].x);
			expect(Object.keys(messages).sort()).toEqual(Object.keys(leaves(en.x)).sort());
			expect(Object.values(messages).every((message) => message.trim().length > 0)).toBe(true);
			if (lang !== 'en') {
				expect(translations[lang].x.title).not.toBe(en.x.title);
				expect(translations[lang].x.counting_question).not.toBe(en.x.counting_question);
			}
		});
		it(`keeps ${lang} in navigation and metadata`, () => {
			const home = lang === 'fr' ? '/x' : `/${lang}/x`;
			expect(platformUrl('x', lang)).toBe(home);
			expect(platformFromPath(`${home}/help`)).toBe('x');
			expect(xAlternates('help')).toContainEqual({ lang, url: `https://boldify.net${home}/help` });
		});
	}
});
