import { describe, it, expect } from 'vitest';
import { italicHandler } from './italic.handler';

describe('italicHandler', () => {
	describe('basic text conversion', () => {
		it('should convert normal text to italic', () => {
			const result = italicHandler('Hello World');
			expect(result).toBe('𝘏𝘦𝘭𝘭𝘰 𝘞𝘰𝘳𝘭𝘥');
		});

		it('should convert italic text back to normal', () => {
			const result = italicHandler('𝘏𝘦𝘭𝘭𝘰 𝘞𝘰𝘳𝘭𝘥');
			expect(result).toBe('Hello World');
		});

		it('should handle empty string', () => {
			const result = italicHandler('');
			expect(result).toBe('');
		});

		it('should handle whitespace only text', () => {
			const result = italicHandler('   ');
			expect(result).toBe('   ');
		});
	});

	describe('character types', () => {
		it('should convert uppercase letters to italic', () => {
			const result = italicHandler('ABC');
			expect(result).toMatch(/𝘈𝘉𝘊/);
		});

		it('should convert lowercase letters to italic', () => {
			const result = italicHandler('abc');
			expect(result).toMatch(/𝘢𝘣𝘤/);
		});

		it('should preserve numbers as-is (italic handler does not convert numbers)', () => {
			const result = italicHandler('123');
			expect(result).toBe('123');
		});

		it('should convert mixed alphanumeric text (letters only)', () => {
			const result = italicHandler('Test123');
			expect(result).toMatch(/𝘛𝘦𝘴𝘵123/);
		});
	});

	describe('accent handling', () => {
		it('should handle French accents', () => {
			const result = italicHandler('café');
			expect(result).toBe('𝘤𝘢𝘧𝘦́');
		});

		it('should convert accented characters and back', () => {
			const original = 'résumé';
			const italic = italicHandler(original);

			expect(italic).toBe('𝘳𝘦́𝘴𝘶𝘮𝘦́');

			const backToNormal = italicHandler(italic);
			expect(backToNormal).toBe(original);
		});

		it('should handle multiple accent types', () => {
			const text = 'àáâäèéêëìíîïòóôöùúûüç';
			const italic = italicHandler(text);

			expect(italic).toBe('𝘢̀𝘢́𝘢̂𝘢̈𝘦̀𝘦́𝘦̂𝘦̈𝘪̀𝘪́𝘪̂𝘪̈𝘰̀𝘰́𝘰̂𝘰̈𝘶̀𝘶́𝘶̂𝘶̈𝘤̧');

			const backToNormal = italicHandler(italic);
			expect(backToNormal).toBe(text);
		});

		it('should handle Spanish accents round-trip', () => {
			const text = 'ãñÃÑ';
			const italic = italicHandler(text);
			const backToNormal = italicHandler(italic);
			expect(backToNormal).toBe(text);
		});

		it('should handle Portuguese accents round-trip', () => {
			const text = 'õÕ';
			const italic = italicHandler(text);
			const backToNormal = italicHandler(italic);
			expect(backToNormal).toBe(text);
		});

		it('should handle Turkish accents round-trip', () => {
			const text = 'ğşĞİŞ';
			const italic = italicHandler(text);
			const backToNormal = italicHandler(italic);
			expect(backToNormal).toBe(text);
		});

		it('should handle Polish accents round-trip', () => {
			const text = 'ąćęłńśźżĄĆĘŁŃŚŹŻ';
			const italic = italicHandler(text);
			const backToNormal = italicHandler(italic);
			expect(backToNormal).toBe(text);
		});

		it('should pass through unsupported characters unchanged (ß, ı)', () => {
			const result = italicHandler('ßı');
			expect(result).toContain('ß');
			expect(result).toContain('ı');
		});
	});

	describe('special characters and punctuation', () => {
		it('should preserve spaces', () => {
			const result = italicHandler('Hello World');
			expect(result).toContain(' ');
		});

		it('should preserve punctuation', () => {
			const result = italicHandler('Hello, World!');
			expect(result).toContain(',');
			expect(result).toContain('!');
		});

		it('should handle symbols unchanged', () => {
			const result = italicHandler('Test@#$%');
			expect(result).toContain('@');
			expect(result).toContain('#');
			expect(result).toContain('$');
			expect(result).toContain('%');
		});
	});

	describe('edge cases', () => {
		it('should handle single character', () => {
			const result = italicHandler('A');
			expect(result).toMatch(/𝘈/);
		});

		it('should handle very long text', () => {
			const longText = 'A'.repeat(1000);
			const result = italicHandler(longText);
			expect(result.length).toBeGreaterThan(0);

			const backToNormal = italicHandler(result);
			expect(backToNormal).toBe(longText);
		});

		it('should handle mixed italic and normal text correctly', () => {
			const partialItalic = '𝘏𝘦𝘭𝘭𝘰 World';
			const result = italicHandler(partialItalic);
			expect(result).toBe('Hello World');
		});
	});

	describe('consistency', () => {
		it('should handle multiple transformations', () => {
			const original = 'Test Message';
			let current = original;

			for (let i = 0; i < 10; i++) {
				current = italicHandler(current);
			}

			// After even number of transformations should be back to original
			// After odd number should be italic
			expect(current).toBe(original);
		});
	});
});
