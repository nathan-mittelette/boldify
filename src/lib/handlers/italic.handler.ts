import type { Handler } from '$lib/handlers/handler';

const baseUpperItalicCode = 0x1d608;
const baseLowerItalicCode = 0x1d622;

const italicMap: Record<string, string> = {};
const invertItalicMap: Record<string, string> = {};

const accentMap: Record<string, string> = {
	é: 'e\u0301',
	è: 'e\u0300',
	ê: 'e\u0302',
	ë: 'e\u0308',
	à: 'a\u0300',
	á: 'a\u0301',
	â: 'a\u0302',
	ä: 'a\u0308',
	ù: 'u\u0300',
	ú: 'u\u0301',
	û: 'u\u0302',
	ü: 'u\u0308',
	ò: 'o\u0300',
	ó: 'o\u0301',
	ô: 'o\u0302',
	ö: 'o\u0308',
	ì: 'i\u0300',
	í: 'i\u0301',
	î: 'i\u0302',
	ï: 'i\u0308',
	ç: 'c\u0327'
};

export const italicHandler: Handler<void> = (text) => {
	if (text.length === 0) return text;

	const firstChar = text.trimStart().charAt(0);

	if (Object.keys(italicMap).length === 0) {
		buildItalicMap();
	}

	if (isNormalUnicode(firstChar)) {
		return splitByMaxLength(text).map(convertCharToItalic).join('');
	} else {
		return splitByMaxLength(text).map(convertCharToNormal).join('');
	}
};

const convertCharToItalic = (char: string): string => {
	if (!char.trim()) {
		return char;
	}

	if (isItalicUnicode(char)) {
		return char;
	}

	return italicMap[char] ?? char;
};

const convertCharToNormal = (char: string): string => {
	if (!char.trim()) {
		return char;
	}

	if (isNormalUnicode(char)) {
		return char;
	}

	return invertItalicMap[char] ?? char;
};

const isItalicUnicode = (char: string): boolean => {
	return !!invertItalicMap[char];
};

const isNormalUnicode = (char: string): boolean => {
	return !!italicMap[char];
};

const buildItalicMap = () => {
	for (let i = 0; i < 26; i++) {
		const upperItalicChar = String.fromCodePoint(i + baseUpperItalicCode);
		const lowerItalicChar = String.fromCodePoint(i + baseLowerItalicCode);

		const upperChar = String.fromCodePoint(i + 'A'.codePointAt(0)!);
		const lowerChar = String.fromCodePoint(i + 'a'.codePointAt(0)!);

		italicMap[upperChar] = upperItalicChar;
		italicMap[lowerChar] = lowerItalicChar;
		invertItalicMap[upperItalicChar] = upperChar;
		invertItalicMap[lowerItalicChar] = lowerChar;
	}

	for (const [key, value] of Object.entries(accentMap)) {
		const computedValue = `${italicMap[value[0]]}${value[1]}`;

		italicMap[key] = computedValue;
		invertItalicMap[computedValue] = key;
	}
};

const splitByMaxLength = (text: string): string[] => {
	const results = [];

	let current = '';

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (italicMap[current + char] || invertItalicMap[current + char]) {
			current += char;
		} else {
			results.push(current);
			current = char;
		}
	}

	results.push(current);
	return results;
};
