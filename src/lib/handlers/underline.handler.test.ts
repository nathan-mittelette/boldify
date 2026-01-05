import { describe, it, expect } from 'vitest';
import { underlineHandler } from './underline.handler';

describe('underlineHandler', () => {
	describe('basic text conversion', () => {
		it('should convert normal text to underlined', () => {
			const result = underlineHandler('Hello World');
			expect(result).toBe(
				'H\u0332e\u0332l\u0332l\u0332o\u0332 W\u0332o\u0332r\u0332l\u0332d\u0332'
			);
		});

		it('should convert underlined text back to normal', () => {
			const result = underlineHandler(
				'H\u0332e\u0332l\u0332l\u0332o\u0332 W\u0332o\u0332r\u0332l\u0332d\u0332'
			);
			expect(result).toBe('Hello World');
		});

		it('should handle empty string', () => {
			const result = underlineHandler('');
			expect(result).toBe('');
		});

		it('should handle whitespace only text', () => {
			const result = underlineHandler('   ');
			expect(result).toBe('   ');
		});
	});

	describe('character types', () => {
		it('should convert uppercase letters to underlined', () => {
			const result = underlineHandler('ABC');
			expect(result).toMatch(/A\u0332B\u0332C\u0332/);
		});

		it('should convert lowercase letters to underlined', () => {
			const result = underlineHandler('abc');
			expect(result).toMatch(/a\u0332b\u0332c\u0332/);
		});

		it('should convert numbers to underlined', () => {
			const result = underlineHandler('123');
			expect(result).toMatch(/1\u03322\u03323\u0332/);
		});

		it('should convert mixed alphanumeric text', () => {
			const result = underlineHandler('Test123');
			expect(result).toMatch(/T\u0332e\u0332s\u0332t\u03321\u03322\u03323\u0332/);
		});
	});

	describe('accent handling', () => {
		it('should handle French accents', () => {
			const result = underlineHandler('café');
			expect(result).toBe('c\u0332a\u0332f\u0332é\u0332');
		});

		it('should convert accented characters and back', () => {
			const original = 'résumé';
			const underline = underlineHandler(original);

			expect(underline).toBe('r\u0332é\u0332s\u0332u\u0332m\u0332é\u0332');

			const backToNormal = underlineHandler(underline);
			expect(backToNormal).toBe(original);
		});

		it('should handle multiple accent types', () => {
			const text = 'àáâäèéêëìíîïòóôöùúûüç';
			const underline = underlineHandler(text);

			expect(underline).toBe(
				'à\u0332á\u0332â\u0332ä\u0332è\u0332é\u0332ê\u0332ë\u0332ì\u0332í\u0332î\u0332ï\u0332ò\u0332ó\u0332ô\u0332ö\u0332ù\u0332ú\u0332û\u0332ü\u0332ç\u0332'
			);

			const backToNormal = underlineHandler(underline);
			expect(backToNormal).toBe(text);
		});
	});

	describe('special characters and punctuation', () => {
		it('should preserve spaces', () => {
			const result = underlineHandler('Hello World');
			expect(result).toContain(' ');
		});

		it('should preserve punctuation', () => {
			const result = underlineHandler('Hello, World!');
			expect(result).toContain(',');
			expect(result).toContain('!');
		});

		it('should handle symbols unchanged', () => {
			const result = underlineHandler('Test@#$%');
			expect(result).toContain('@');
			expect(result).toContain('#');
			expect(result).toContain('$');
			expect(result).toContain('%');
		});
	});

	describe('edge cases', () => {
		it('should handle single character', () => {
			const result = underlineHandler('A');
			expect(result).toMatch(/A\u0332/);
		});

		it('should handle very long text', () => {
			const longText = 'A'.repeat(1000);
			const result = underlineHandler(longText);
			expect(result.length).toBeGreaterThan(0);

			const backToNormal = underlineHandler(result);
			expect(backToNormal).toBe(longText);
		});

		it('should handle mixed underlined and normal text correctly', () => {
			const partialUnderline = 'H\u0332e\u0332l\u0332l\u0332o\u0332 World';
			const result = underlineHandler(partialUnderline);
			expect(result).toBe('Hello World');
		});
	});

	describe('consistency', () => {
		it('should handle multiple transformations', () => {
			const original = 'Test Message';
			let current = original;

			for (let i = 0; i < 10; i++) {
				current = underlineHandler(current);
			}

			// After even number of transformations should be back to original
			// After odd number should be underlined
			expect(current).toBe(original);
		});
	});
});
