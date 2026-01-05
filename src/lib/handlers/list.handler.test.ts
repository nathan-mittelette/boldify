import { describe, it, expect } from 'vitest';
import { listHandler, type ListType } from './list.handler';

describe('listHandler', () => {
	describe('bullet list functionality', () => {
		it('should convert normal text to bullet list', () => {
			const result = listHandler('Item 1\nItem 2\nItem 3', 'bullet');
			expect(result).toBe('• Item 1\n• Item 2\n• Item 3');
		});

		it('should convert bullet list back to normal text', () => {
			const bulletText = '• Item 1\n• Item 2\n• Item 3';
			const result = listHandler(bulletText, 'bullet');
			expect(result).toBe('Item 1\nItem 2\nItem 3');
		});

		it('should handle single line bullet conversion', () => {
			const result = listHandler('Single item', 'bullet');
			expect(result).toBe('• Single item');
		});

		it('should handle already bulleted single line', () => {
			const result = listHandler('• Single item', 'bullet');
			expect(result).toBe('Single item');
		});
	});

	describe('ordered list functionality', () => {
		it('should convert normal text to ordered list', () => {
			const result = listHandler('Item 1\nItem 2\nItem 3', 'ordered');
			expect(result).toBe('1. Item 1\n2. Item 2\n3. Item 3');
		});

		it('should convert ordered list back to normal text', () => {
			const orderedText = '1. Item 1\n2. Item 2\n3. Item 3';
			const result = listHandler(orderedText, 'ordered');
			expect(result).toBe('Item 1\nItem 2\nItem 3');
		});

		it('should handle single line ordered conversion', () => {
			const result = listHandler('Single item', 'ordered');
			expect(result).toBe('1. Single item');
		});

		it('should handle already ordered single line', () => {
			const result = listHandler('1. Single item', 'ordered');
			expect(result).toBe('Single item');
		});

		it('should handle different ordered formats', () => {
			const result = listHandler('5. Item 1\n10. Item 2', 'ordered');
			expect(result).toBe('Item 1\nItem 2');
		});
	});

	describe('edge cases', () => {
		it('should handle empty string', () => {
			const result = listHandler('', 'bullet');
			expect(result).toBe('');
		});

		it('should handle empty string with ordered', () => {
			const result = listHandler('', 'ordered');
			expect(result).toBe('');
		});

		it('should handle no args parameter', () => {
			const result = listHandler('Test text');
			expect(result).toBe('Test text');
		});

		it('should handle invalid list type', () => {
			const result = listHandler('Test text', 'invalid' as ListType);
			expect(result).toBe('Test text');
		});
	});

	describe('mixed content handling', () => {
		it('should handle lines with existing bullets mixed with normal lines', () => {
			const text = '• Already bulleted\nNormal line\n• Another bullet';
			const result = listHandler(text, 'bullet');
			expect(result).toBe('Already bulleted\nNormal line\nAnother bullet');
		});

		it('should handle lines with existing numbers mixed with normal lines', () => {
			const text = '1. Already numbered\nNormal line\n2. Another number';
			const result = listHandler(text, 'ordered');
			expect(result).toBe('Already numbered\nNormal line\nAnother number');
		});

		it('should convert all lines to bullets even if some are already bulleted', () => {
			const text = '• Already bulleted\nNormal line';
			const normalText = listHandler(text, 'bullet'); // Remove bullets
			const allBulleted = listHandler(normalText, 'bullet'); // Add bullets to all
			expect(allBulleted).toBe('• Already bulleted\n• Normal line');
		});
	});

	describe('whitespace and formatting', () => {
		it('should preserve line structure', () => {
			const text = 'Line 1\n\nLine 3\nLine 4';
			const result = listHandler(text, 'bullet');
			expect(result).toBe('• Line 1\n• \n• Line 3\n• Line 4');
		});

		it('should handle text with leading spaces', () => {
			const text = '  Indented line\nNormal line';
			const result = listHandler(text, 'bullet');
			expect(result).toBe('•   Indented line\n• Normal line');
		});

		it('should handle text with trailing spaces', () => {
			const text = 'Line with spaces  \nNormal line';
			const result = listHandler(text, 'bullet');
			expect(result).toBe('• Line with spaces  \n• Normal line');
		});
	});

	describe('consistency and idempotency', () => {
		it('should be idempotent for bullet lists', () => {
			const text = 'Item 1\nItem 2';
			const bullet1 = listHandler(text, 'bullet');
			const normal = listHandler(bullet1, 'bullet');
			const bullet2 = listHandler(normal, 'bullet');

			expect(normal).toBe(text);
			expect(bullet2).toBe(bullet1);
		});

		it('should be idempotent for ordered lists', () => {
			const text = 'Item 1\nItem 2';
			const ordered1 = listHandler(text, 'ordered');
			const normal = listHandler(ordered1, 'ordered');
			const ordered2 = listHandler(normal, 'ordered');

			expect(normal).toBe(text);
			expect(ordered2).toBe(ordered1);
		});

		it('should handle multiple transformations between list types', () => {
			const original = 'Item 1\nItem 2\nItem 3';

			const bulleted = listHandler(original, 'bullet');
			expect(bulleted).toBe('• Item 1\n• Item 2\n• Item 3');

			const backToNormal = listHandler(bulleted, 'bullet');
			expect(backToNormal).toBe(original);

			const ordered = listHandler(backToNormal, 'ordered');
			expect(ordered).toBe('1. Item 1\n2. Item 2\n3. Item 3');

			const backToNormalAgain = listHandler(ordered, 'ordered');
			expect(backToNormalAgain).toBe(original);
		});
	});

	describe('special characters in list items', () => {
		it('should handle list items with special characters', () => {
			const text = 'Item with @#$%\nItem with émojis 🚀';
			const result = listHandler(text, 'bullet');
			expect(result).toBe('• Item with @#$%\n• Item with émojis 🚀');
		});

		it('should handle list items with numbers in text', () => {
			const text = 'Step 1 is important\nStep 2 follows';
			const result = listHandler(text, 'ordered');
			expect(result).toBe('1. Step 1 is important\n2. Step 2 follows');
		});

		it('should handle list items that look like other list formats', () => {
			const text = '• This looks like a bullet\n1. This looks numbered';
			const result = listHandler(text, 'ordered');
			expect(result).toBe('1. • This looks like a bullet\n1. This looks numbered');
		});
	});
});
