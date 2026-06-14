import { browser } from '$app/environment';

type ClarityValue = string | string[];
type FormatAction =
	| 'bold'
	| 'italic'
	| 'underline'
	| 'strike'
	| 'overline'
	| 'ordered_list'
	| 'bullet_list';

const TEXT_LENGTH_TAG = 'text_length_before_copy';

function getClarity(): Window['clarity'] {
	if (!browser || typeof window.clarity !== 'function') return undefined;

	return window.clarity;
}

export function trackClarityEvent(name: string): void {
	const clarity = getClarity();
	if (!clarity) return;

	clarity('event', name);
}

export function setClarityTag(key: string, value: ClarityValue): void {
	const clarity = getClarity();
	if (!clarity) return;

	clarity('set', key, value);
}

export function getTextLengthBucket(textValue: string): string {
	const textLength = [...textValue.trim()].length;

	if (textLength < 100) return '<100';
	if (textLength <= 500) return '100-500';
	if (textLength <= 1000) return '500-1000';
	return '1000+';
}

export function trackTextCopied(textValue: string): void {
	setClarityTag(TEXT_LENGTH_TAG, getTextLengthBucket(textValue));
	trackClarityEvent('text_copied');
}

export function trackTextPasted(): void {
	trackClarityEvent('text_pasted');
}

export function trackFormatUsed(format: FormatAction): void {
	trackClarityEvent(`${format}_used`);
}

export function trackLanguageChanged(from: string | null | undefined, to: string): void {
	setClarityTag('language_from', from ?? 'unknown');
	setClarityTag('language_to', to);
	trackClarityEvent('language_changed');
}

export function trackBuyMeACoffeeClicked(source: string): void {
	setClarityTag('buymeacoffee_source', source);
	trackClarityEvent('buymeacoffee_clicked');
}
