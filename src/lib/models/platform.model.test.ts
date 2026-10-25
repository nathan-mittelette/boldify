import { expect, it } from 'vitest';
import { platformFromPath, platforms, platformUrl, sectionFromPath } from './platform.model';
it.each([
	'/x',
	'/en/x',
	'/fr/x',
	'/x/',
	'/x/about',
	'/en/x/help',
	'/en/x/how-it-works',
	'/x/mcp',
	'/es/x',
	'/es/x/help',
	'/pt/x/mcp',
	'/de/x',
	'/tr/x/about',
	'/pl/x/how-it-works'
])('recognizes X route %s', (path) => expect(platformFromPath(path)).toBe('x'));
it.each(['/', '/en', '/fr/help', '/en/mcp', '/it/x', '/it/x/help', '/x/unknown'])(
	'keeps other routes outside X: %s',
	(path) => expect(platformFromPath(path)).toBe('linkedin')
);
it('links only published X translations', () => {
	expect(platforms.x.home('fr')).toBe('/x');
	expect(platforms.x.home('en')).toBe('/en/x');
	expect(platforms.x.home('es')).toBe('/es/x');
});

it('preserves the section while switching platforms and languages', () => {
	expect(sectionFromPath('/en/x/how-it-works')).toBe('how-it-works');
	expect(sectionFromPath('/x/help/')).toBe('help');
	expect(sectionFromPath('/x')).toBeUndefined();
	expect(platformUrl('x', 'fr', 'about')).toBe('/x/about');
	expect(platformUrl('x', 'en', 'about')).toBe('/en/x/about');
	expect(platformUrl('linkedin', 'fr', 'about')).toBe('/fr/about');
	expect(platformUrl('x', 'de', 'help')).toBe('/de/x/help');
});
