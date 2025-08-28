import { describe, it, expect } from 'vitest';
import { overlineHandler } from './overline.handler';

describe('overlineHandler', () => {
	describe('basic text conversion', () => {
		it('should convert normal text to overlined', () => {
			const result = overlineHandler('Hello World');
			expect(result).toBe(
				'H\u0305e\u0305l\u0305l\u0305o\u0305 W\u0305o\u0305r\u0305l\u0305d\u0305'
			);
		});

		it('should convert overlined text back to normal', () => {
			const result = overlineHandler(
				'H\u0305e\u0305l\u0305l\u0305o\u0305 W\u0305o\u0305r\u0305l\u0305d\u0305'
			);
			expect(result).toBe('Hello World');
		});

		it('should handle empty string', () => {
			const result = overlineHandler('');
			expect(result).toBe('');
		});

		it('should handle whitespace only text', () => {
			const result = overlineHandler('   ');
			expect(result).toBe('   ');
		});
	});

	describe('character types', () => {
		it('should convert uppercase letters to overlined', () => {
			const result = overlineHandler('ABC');
			expect(result).toMatch(/A\u0305B\u0305C\u0305/);
		});

		it('should convert lowercase letters to overlined', () => {
			const result = overlineHandler('abc');
			expect(result).toMatch(/a\u0305b\u0305c\u0305/);
		});

		it('should convert numbers to overlined', () => {
			const result = overlineHandler('123');
			expect(result).toMatch(/1\u03052\u03053\u0305/);
		});

		it('should convert mixed alphanumeric text', () => {
			const result = overlineHandler('Test123');
			expect(result).toMatch(/T\u0305e\u0305s\u0305t\u03051\u03052\u03053\u0305/);
		});
	});

	describe('accent handling', () => {
		it('should handle French accents', () => {
			const result = overlineHandler('café');
			expect(result).toBe('c\u0305a\u0305f\u0305é\u0305');
		});

		it('should convert accented characters and back', () => {
			const original = 'résumé';
			const overlined = overlineHandler(original);

			expect(overlined).toBe('r\u0305é\u0305s\u0305u\u0305m\u0305é\u0305');

			const backToNormal = overlineHandler(overlined);
			expect(backToNormal).toBe(original);
		});

		it('should handle multiple accent types', () => {
			const text = 'àáâäèéêëìíîïòóôöùúûüç';
			const overlined = overlineHandler(text);

			expect(overlined).toBe(
				'à\u0305á\u0305â\u0305ä\u0305è\u0305é\u0305ê\u0305ë\u0305ì\u0305í\u0305î\u0305ï\u0305ò\u0305ó\u0305ô\u0305ö\u0305ù\u0305ú\u0305û\u0305ü\u0305ç\u0305'
			);

			const backToNormal = overlineHandler(overlined);
			expect(backToNormal).toBe(text);
		});
	});

	describe('special characters and punctuation', () => {
		it('should preserve spaces', () => {
			const result = overlineHandler('Hello World');
			expect(result).toContain(' ');
		});

		it('should preserve punctuation', () => {
			const result = overlineHandler('Hello, World!');
			expect(result).toContain(',');
			expect(result).toContain('!');
		});

		it('should handle symbols unchanged', () => {
			const result = overlineHandler('Test@#$%');
			expect(result).toContain('@');
			expect(result).toContain('#');
			expect(result).toContain('$');
			expect(result).toContain('%');
		});
	});

	describe('edge cases', () => {
		it('should handle single character', () => {
			const result = overlineHandler('A');
			expect(result).toMatch(/A\u0305/);
		});

		it('should handle very long text', () => {
			const longText = 'A'.repeat(1000);
			const result = overlineHandler(longText);
			expect(result.length).toBeGreaterThan(0);

			const backToNormal = overlineHandler(result);
			expect(backToNormal).toBe(longText);
		});

		it('should handle mixed overlined and normal text correctly', () => {
			const partialOverlined = 'H\u0305e\u0305l\u0305l\u0305o\u0305 World';
			const result = overlineHandler(partialOverlined);
			expect(result).toBe('Hello World');
		});
	});

	describe('consistency', () => {
		it('should handle multiple transformations', () => {
			const original = 'Test Message';
			let current = original;

			for (let i = 0; i < 10; i++) {
				current = overlineHandler(current);
			}

			// After even number of transformations should be back to original
			// After odd number should be overlined
			expect(current).toBe(original);
		});
	});
});
