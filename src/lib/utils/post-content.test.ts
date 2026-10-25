import { describe, expect, it } from 'vitest';
import { countXPost, extractPostContent } from './post-content';
import { boldHandler } from '../handlers/bold.handler';
import { italicHandler } from '../handlers/italic.handler';
import { strikeHandler } from '../handlers/strike.handler';

describe('final post content', () => {
	it.each([
		['', ''],
		['\n', ''],
		['hello\n', 'hello'],
		['hello\n\n\n', 'hello\n\n'],
		['hello', 'hello']
	])('extracts only Quill’s terminal newline: %j', (input, output) => {
		expect(extractPostContent(input)).toBe(output);
	});
});

describe('X weighted standard posts', () => {
	it.each([
		[259, 'normal'],
		[260, 'warning'],
		[280, 'warning'],
		[281, 'over']
	] as const)('handles %i units', (used, state) => {
		expect(countXPost('a'.repeat(used))).toEqual({ used, remaining: 280 - used, state });
	});
	it.each([
		[259, 'normal'],
		[260, 'warning'],
		[280, 'warning'],
		[281, 'over']
	] as const)('handles %i units after formatting', (used, state) => {
		const styled = boldHandler('a'.repeat(Math.floor(used / 2))) + (used % 2 ? 'a' : '');
		expect(countXPost(styled)).toEqual({ used, remaining: 280 - used, state });
	});
	it.each(['https://example.com', 'https://example.com/' + 'path/'.repeat(60)])(
		'counts detected URLs as 23: %s',
		(url) => {
			expect(countXPost(url).used).toBe(23);
		}
	);
	it.each(['😀', '🙋🏽', '👨‍🎤', '👨‍👩‍👧‍👦', '🇫🇷'])('counts emoji sequence %s as two', (emoji) => {
		expect(countXPost(emoji).used).toBe(2);
	});
	it('normalizes for counting without changing the original text', () => {
		const content = 'cafe\u0301';
		expect(countXPost(content).used).toBe(4);
		expect(countXPost('café').used).toBe(4);
		expect(content).toBe('cafe\u0301');
	});
	it('counts the final Unicode formats', () => {
		expect(countXPost(boldHandler('abc')).used).toBe(6);
		expect(countXPost(italicHandler('abc')).used).toBe(6);
		expect(countXPost(strikeHandler('abc')).used).toBe(6);
	});
	it('preserves empty content, whitespace and user line breaks', () => {
		expect(countXPost('').used).toBe(0);
		expect(countXPost('  \n\n').used).toBe(4);
		expect(countXPost('hello\nworld').used).toBe(11);
	});
});
