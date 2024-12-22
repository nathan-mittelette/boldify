import type { Handler } from '$lib/handlers/handler';

const baseUpperBoldCode = 0x1d400;
const baseLowerBoldCode = 0x1d41a;
const baseNumberBoldCode = 0x1d7ce;

const boldMap: Record<string, string> = {};
const invertBoldMap: Record<string, string> = {};

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

export const boldHandler: Handler<void> = (text) => {
	if (text.length === 0) return text;

	const firstChar = text.trimStart().charAt(0);

	if (Object.keys(boldMap).length === 0) {
		buildBoldMap();
	}

	if (isNormalUnicode(firstChar)) {
		console.log('convert to bold');
		return splitByMaxLength(text).map(convertCharToBold).join('');
	} else {
		console.log('convert to normal');
		return splitByMaxLength(text).map(convertCharToNormal).join('');
	}
};

const convertCharToBold = (char: string): string => {
	if (!char.trim()) {
		return char;
	}

	if (isBoldUnicode(char)) {
		return char;
	}

	return boldMap[char] ?? char;
};

const convertCharToNormal = (char: string): string => {
	if (!char.trim()) {
		return char;
	}

	if (isNormalUnicode(char)) {
		return char;
	}

	return invertBoldMap[char] ?? char;
};

const isBoldUnicode = (char: string): boolean => {
	return !!invertBoldMap[char];
};

const isNormalUnicode = (char: string): boolean => {
	return !!boldMap[char];
};

const buildBoldMap = () => {
	for (let i = 0; i < 26; i++) {
		const upperBoldChar = String.fromCodePoint(i + baseUpperBoldCode);
		const lowerBoldChar = String.fromCodePoint(i + baseLowerBoldCode);

		const upperChar = String.fromCodePoint(i + 'A'.codePointAt(0)!);
		const lowerChar = String.fromCodePoint(i + 'a'.codePointAt(0)!);

		boldMap[upperChar] = upperBoldChar;
		boldMap[lowerChar] = lowerBoldChar;
		invertBoldMap[upperBoldChar] = upperChar;
		invertBoldMap[lowerBoldChar] = lowerChar;
	}

	for (let i = 0; i < 10; i++) {
		const numberBoldChar = String.fromCodePoint(i + baseNumberBoldCode);
		const numberChar = String.fromCodePoint(i + '0'.codePointAt(0)!);

		boldMap[numberChar] = numberBoldChar;
		invertBoldMap[numberBoldChar] = numberChar;
	}

	for (const [key, value] of Object.entries(accentMap)) {
		const computedValue = `${boldMap[value[0]]}${value[1]}`;

		boldMap[key] = computedValue;
		invertBoldMap[computedValue] = key;
	}
};

const splitByMaxLength = (text: string): string[] => {
	const results = [];

	let current = '';

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (boldMap[current + char] || invertBoldMap[current + char]) {
			current += char;
		} else {
			results.push(current);
			current = char;
		}
	}

	results.push(current);
	return results;
};
