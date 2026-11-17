import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { it } from 'node:test';
import { runInNewContext } from 'node:vm';

// CloudFront loads a global handler, not a Node or ES module.
const source = readFileSync(new URL('./redirect.js', import.meta.url), 'utf8');
const handler = runInNewContext(`${source}\nhandler`, { console });
const request = (uri, querystring = {}) => handler({ request: { uri, querystring } });

for (const [alias, canonical] of [
	['/fr', '/'],
	['/fr.html/', '/'],
	['/index.html', '/'],
	['/en.html', '/en'],
	['/pl/how-it-works.html/', '/pl/how-it-works'],
	['/fr/x', '/x'],
	['/fr/x/help.html/', '/x/help'],
	['/es/x.html', '/es/x'],
	['/en/', '/en']
]) {
	it(`redirects ${alias} straight to ${canonical}`, () => {
		const result = request(alias);
		assert.equal(result.statusCode, 301);
		assert.equal(result.headers.location.value, canonical);
		assert.equal(request(canonical).uri, canonical === '/' ? '/index.html' : `${canonical}.html`);
	});
}

it('preserves query values, repeated keys and empty values in Location', () => {
	const result = request('/en/', {
		utm_source: { value: 'audit' },
		utm_campaign: { value: 'test%20fr+web' },
		tag: { value: 'a', multiValue: [{ value: 'a' }, { value: 'b' }] },
		empty: { value: '' }
	});
	assert.equal(
		result.headers.location.value,
		'/en?utm_source=audit&utm_campaign=test%20fr+web&tag=a&tag=b&empty='
	);
});

it('encodes literal delimiters, non-ASCII text and header control characters', () => {
	const result = request('/fr.html', { 'a&b': { value: 'é#x\r\n' } });
	assert.equal(result.headers.location.value, '/?a%26b=%C3%A9%23x%0D%0A');
});

it('does not redirect canonical paths carrying tracking parameters', () => {
	const querystring = { utm_source: { value: 'audit' } };
	assert.deepEqual(request('/en', querystring), { uri: '/en.html', querystring });
});

for (const uri of [
	'/.well-known/api-catalog',
	'/.well-known/example/',
	'/robots.txt',
	'/404.html',
	'/missing.html',
	'/missing/',
	'//example.test/'
]) {
	it(`does not redirect ${uri}`, () => {
		assert.equal(request(uri).uri, uri);
	});
}
