import { describe, it, expect } from 'vitest';
import { boldHandler } from './bold.handler';

describe('boldHandler', () => {
	describe('basic text conversion', () => {
		it('should convert normal text to bold', () => {
			const result = boldHandler('Hello World');
			expect(result).toBe('𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱');
		});

		it('should convert bold text back to normal', () => {
			const result = boldHandler('𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱');
			expect(result).toBe('Hello World');
		});

		it('should handle empty string', () => {
			const result = boldHandler('');
			expect(result).toBe('');
		});

		it('should handle whitespace only text', () => {
			const result = boldHandler('   ');
			expect(result).toBe('   ');
		});
	});

	describe('character types', () => {
		it('should convert uppercase letters to bold', () => {
			const result = boldHandler('ABC');
			expect(result).toMatch(/𝗔𝗕𝗖/);
		});

		it('should convert lowercase letters to bold', () => {
			const result = boldHandler('abc');
			expect(result).toMatch(/𝗮𝗯𝗰/);
		});

		it('should convert numbers to bold', () => {
			const result = boldHandler('123');
			expect(result).toMatch(/𝟭𝟮𝟯/);
		});

		it('should convert mixed alphanumeric text', () => {
			const result = boldHandler('Test123');
			expect(result).toMatch(/𝗧𝗲𝘀𝘁𝟭𝟮𝟯/);
		});
	});

	describe('accent handling', () => {
		it('should handle French accents', () => {
			const result = boldHandler('café');
			expect(result).toBe('𝗰𝗮𝗳𝗲́');
		});

		it('should convert accented characters and back', () => {
			const original = 'résumé';
			const bold = boldHandler(original);

			expect(bold).toBe('𝗿𝗲́𝘀𝘂𝗺𝗲́');

			const backToNormal = boldHandler(bold);
			expect(backToNormal).toBe(original);
		});

		it('should handle multiple accent types', () => {
			const text = 'àáâäèéêëìíîïòóôöùúûüç';
			const bold = boldHandler(text);

			expect(bold).toBe('𝗮̀𝗮́𝗮̂𝗮̈𝗲̀𝗲́𝗲̂𝗲̈𝗶̀𝗶́𝗶̂𝗶̈𝗼̀𝗼́𝗼̂𝗼̈𝘂̀𝘂́𝘂̂𝘂̈𝗰̧');

			const backToNormal = boldHandler(bold);
			expect(backToNormal).toBe(text);
		});

		it('should handle Spanish accents round-trip', () => {
			const text = 'ãñÃÑ';
			const bold = boldHandler(text);
			const backToNormal = boldHandler(bold);
			expect(backToNormal).toBe(text);
		});

		it('should handle Portuguese accents round-trip', () => {
			const text = 'õÕ';
			const bold = boldHandler(text);
			const backToNormal = boldHandler(bold);
			expect(backToNormal).toBe(text);
		});

		it('should handle Turkish accents round-trip', () => {
			const text = 'ğşĞİŞ';
			const bold = boldHandler(text);
			const backToNormal = boldHandler(bold);
			expect(backToNormal).toBe(text);
		});

		it('should handle Polish accents round-trip', () => {
			const text = 'ąćęłńśźżĄĆĘŁŃŚŹŻ';
			const bold = boldHandler(text);
			const backToNormal = boldHandler(bold);
			expect(backToNormal).toBe(text);
		});

		it('should pass through unsupported characters unchanged (ß, ı)', () => {
			const result = boldHandler('ßı');
			expect(result).toContain('ß');
			expect(result).toContain('ı');
		});
	});

	describe('special characters and punctuation', () => {
		it('should preserve spaces', () => {
			const result = boldHandler('Hello World');
			expect(result).toContain(' ');
		});

		it('should preserve punctuation', () => {
			const result = boldHandler('Hello, World!');
			expect(result).toContain(',');
			expect(result).toContain('!');
		});

		it('should handle symbols unchanged', () => {
			const result = boldHandler('Test@#$%');
			expect(result).toContain('@');
			expect(result).toContain('#');
			expect(result).toContain('$');
			expect(result).toContain('%');
		});
	});

	describe('edge cases', () => {
		it('should handle single character', () => {
			const result = boldHandler('A');
			expect(result).toMatch(/𝗔/);
		});

		it('should handle very long text', () => {
			const longText = 'A'.repeat(1000);
			const result = boldHandler(longText);
			expect(result.length).toBeGreaterThan(0);

			const backToNormal = boldHandler(result);
			expect(backToNormal).toBe(longText);
		});

		it('should handle mixed bold and normal text correctly', () => {
			const partialBold = '𝗛𝗲𝗹𝗹𝗼 World';
			const result = boldHandler(partialBold);
			expect(result).toBe('Hello World');
		});
	});

	describe('consistency', () => {
		it('should handle multiple transformations', () => {
			const original = 'Test Message';
			let current = original;

			for (let i = 0; i < 10; i++) {
				current = boldHandler(current);
			}

			// After even number of transformations should be back to original
			// After odd number should be bold
			expect(current).toBe(original);
		});
	});
});
