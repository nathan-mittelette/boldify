import { describe, it, expect } from 'vitest';
import { prepareTextForLinkedIn, LINKEDIN_EMPTY_LINE_PLACEHOLDER } from './linkedin-text';

describe('prepareTextForLinkedIn', () => {
	it('puts a zero-width space on empty lines between paragraphs', () => {
		const input = 'Para un\n\nPara deux';
		expect(prepareTextForLinkedIn(input)).toBe(
			`Para un\n${LINKEDIN_EMPTY_LINE_PLACEHOLDER}\nPara deux`
		);
	});

	it('handles multiple consecutive empty lines', () => {
		const input = 'A\n\n\nB';
		const result = prepareTextForLinkedIn(input);
		expect(result).toBe(
			`A\n${LINKEDIN_EMPTY_LINE_PLACEHOLDER}\n${LINKEDIN_EMPTY_LINE_PLACEHOLDER}\nB`
		);
	});

	it('treats whitespace-only lines as empty', () => {
		const input = 'A\n   \nB';
		expect(prepareTextForLinkedIn(input)).toBe(`A\n${LINKEDIN_EMPTY_LINE_PLACEHOLDER}\nB`);
	});

	it('does not touch lines with content', () => {
		const input = 'Hello world\nSecond line';
		expect(prepareTextForLinkedIn(input)).toBe(input);
	});

	it('preserves Unicode formatting (bold/italic mathematical alphanumerics)', () => {
		const input = '𝗕𝗼𝗹𝗱 𝘁𝗲𝘅𝘁\n\n𝘪𝘵𝘢𝘭𝘪𝘤';
		const result = prepareTextForLinkedIn(input);
		expect(result).toContain('𝗕𝗼𝗹𝗱 𝘁𝗲𝘅𝘁');
		expect(result).toContain('𝘪𝘵𝘢𝘭𝘪𝘤');
		expect(result).toBe(`𝗕𝗼𝗹𝗱 𝘁𝗲𝘅𝘁\n${LINKEDIN_EMPTY_LINE_PLACEHOLDER}\n𝘪𝘵𝘢𝘭𝘪𝘤`);
	});

	it('preserves list lines (bullets and numbers are content, not empty lines)', () => {
		const input = '• item\n\n1. numbered';
		const result = prepareTextForLinkedIn(input);
		expect(result).toContain('• item');
		expect(result).toContain('1. numbered');
	});

	it('returns single-line text unchanged', () => {
		expect(prepareTextForLinkedIn('just one line')).toBe('just one line');
	});

	it('returns empty string unchanged', () => {
		expect(prepareTextForLinkedIn('')).toBe('');
	});

	it('placeholder is exactly U+200B (zero-width space, invisible)', () => {
		expect([...LINKEDIN_EMPTY_LINE_PLACEHOLDER].map((c) => c.codePointAt(0))).toEqual([0x200b]);
	});
});
