import { describe, it, expect } from 'vitest';
import { strikeHandler } from './strike.handler';

describe('strikeHandler', () => {
	describe('basic text conversion', () => {
		it('should convert normal text to strikethrough', () => {
			const result = strikeHandler('Hello World');
			expect(result).toBe(
				'H\u0336e\u0336l\u0336l\u0336o\u0336 W\u0336o\u0336r\u0336l\u0336d\u0336'
			);
		});

		it('should convert strikethrough text back to normal', () => {
			const result = strikeHandler(
				'H\u0336e\u0336l\u0336l\u0336o\u0336 W\u0336o\u0336r\u0336l\u0336d\u0336'
			);
			expect(result).toBe('Hello World');
		});

		it('should handle empty string', () => {
			const result = strikeHandler('');
			expect(result).toBe('');
		});

		it('should handle whitespace only text', () => {
			const result = strikeHandler('   ');
			expect(result).toBe('   ');
		});
	});

	describe('character types', () => {
		it('should convert uppercase letters to strikethrough', () => {
			const result = strikeHandler('ABC');
			expect(result).toMatch(/A\u0336B\u0336C\u0336/);
		});

		it('should convert lowercase letters to strikethrough', () => {
			const result = strikeHandler('abc');
			expect(result).toMatch(/a\u0336b\u0336c\u0336/);
		});

		it('should convert numbers to strikethrough', () => {
			const result = strikeHandler('123');
			expect(result).toMatch(/1\u03362\u03363\u0336/);
		});

		it('should convert mixed alphanumeric text', () => {
			const result = strikeHandler('Test123');
			expect(result).toMatch(/T\u0336e\u0336s\u0336t\u03361\u03362\u03363\u0336/);
		});
	});

	describe('accent handling', () => {
		it('should handle French accents', () => {
			const result = strikeHandler('café');
			expect(result).toBe('c\u0336a\u0336f\u0336é\u0336');
		});

		it('should convert accented characters and back', () => {
			const original = 'résumé';
			const strike = strikeHandler(original);

			expect(strike).toBe('r\u0336é\u0336s\u0336u\u0336m\u0336é\u0336');

			const backToNormal = strikeHandler(strike);
			expect(backToNormal).toBe(original);
		});

		it('should handle multiple accent types', () => {
			const text = 'àáâäèéêëìíîïòóôöùúûüç';
			const strike = strikeHandler(text);

			expect(strike).toBe(
				'à\u0336á\u0336â\u0336ä\u0336è\u0336é\u0336ê\u0336ë\u0336ì\u0336í\u0336î\u0336ï\u0336ò\u0336ó\u0336ô\u0336ö\u0336ù\u0336ú\u0336û\u0336ü\u0336ç\u0336'
			);

			const backToNormal = strikeHandler(strike);
			expect(backToNormal).toBe(text);
		});
	});

	describe('special characters and punctuation', () => {
		it('should preserve spaces', () => {
			const result = strikeHandler('Hello World');
			expect(result).toContain(' ');
		});

		it('should preserve punctuation', () => {
			const result = strikeHandler('Hello, World!');
			expect(result).toContain(',');
			expect(result).toContain('!');
		});

		it('should handle symbols unchanged', () => {
			const result = strikeHandler('Test@#$%');
			expect(result).toContain('@');
			expect(result).toContain('#');
			expect(result).toContain('$');
			expect(result).toContain('%');
		});
	});

	describe('edge cases', () => {
		it('should handle single character', () => {
			const result = strikeHandler('A');
			expect(result).toMatch(/A\u0336/);
		});

		it('should handle very long text', () => {
			const longText = 'A'.repeat(1000);
			const result = strikeHandler(longText);
			expect(result.length).toBeGreaterThan(0);

			const backToNormal = strikeHandler(result);
			expect(backToNormal).toBe(longText);
		});

		it('should handle mixed strikethrough and normal text correctly', () => {
			const partialStrike = 'H\u0336e\u0336l\u0336l\u0336o\u0336 World';
			const result = strikeHandler(partialStrike);
			expect(result).toBe('Hello World');
		});
	});

	describe('consistency', () => {
		it('should handle multiple transformations', () => {
			const original = 'Test Message';
			let current = original;

			for (let i = 0; i < 10; i++) {
				current = strikeHandler(current);
			}

			// After even number of transformations should be back to original
			// After odd number should be strikethrough
			expect(current).toBe(original);
		});
	});
});
