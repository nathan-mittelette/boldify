/**
 * LinkedIn's post composer strips truly empty lines when pasting plain text
 * (known issue, Oct 2026): a blank line between two paragraphs collapses and
 * the post becomes a wall of text. Workaround: put a zero-width space
 * (U+200B) on each empty line so LinkedIn keeps the visual line break.
 * The character is invisible to the reader.
 *
 * Only empty (or whitespace-only) lines are modified — every other line is
 * returned untouched, so Unicode formatting (bold/italic/...) is preserved.
 *
 * X (Twitter) does not have this issue, so the transformation is only applied
 * for the LinkedIn platform (see TextEditor.svelte).
 */
export const LINKEDIN_EMPTY_LINE_PLACEHOLDER = '​';

export const prepareTextForLinkedIn = (text: string): string => {
	if (text.length === 0) return text;

	return text
		.split('\n')
		.map((line) => (line.trim().length === 0 ? LINKEDIN_EMPTY_LINE_PLACEHOLDER : line))
		.join('\n');
};
