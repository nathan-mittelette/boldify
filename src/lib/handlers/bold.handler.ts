import type { Handler } from '$lib/handlers/handler';

const baseUpperBoldCode = 0x1d5d4;
const baseLowerBoldCode = 0x1d5ee;
const baseNumberBoldCode = 0x1d7ec;

const boldMap: Record<string, string> = {};
const invertBoldMap: Record<string, string> = {};

const accentMap: Record<string, string> = {
	// French accents
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
	ç: 'c\u0327',
	// Spanish accents
	ñ: 'n\u0303',
	// Portuguese accents
	ã: 'a\u0303',
	õ: 'o\u0303',
	// German accents (ä, ö, ü already covered above)
	// Turkish accents
	ğ: 'g\u0306',
	ş: 's\u0327',
	// Polish accents
	ą: 'a\u0328',
	ć: 'c\u0301',
	ę: 'e\u0328',
	ł: 'l\u0337',
	ń: 'n\u0301',
	ś: 's\u0301',
	ź: 'z\u0301',
	ż: 'z\u0307',
	// Uppercase variants
	É: 'E\u0301',
	È: 'E\u0300',
	Ê: 'E\u0302',
	Ë: 'E\u0308',
	À: 'A\u0300',
	Á: 'A\u0301',
	Â: 'A\u0302',
	Ä: 'A\u0308',
	Ù: 'U\u0300',
	Ú: 'U\u0301',
	Û: 'U\u0302',
	Ü: 'U\u0308',
	Ò: 'O\u0300',
	Ó: 'O\u0301',
	Ô: 'O\u0302',
	Ö: 'O\u0308',
	Ì: 'I\u0300',
	Í: 'I\u0301',
	Î: 'I\u0302',
	Ï: 'I\u0308',
	Ç: 'C\u0327',
	Ã: 'A\u0303',
	Ñ: 'N\u0303',
	Õ: 'O\u0303',
	Ğ: 'G\u0306',
	İ: 'I\u0307',
	Ş: 'S\u0327',
	Ą: 'A\u0328',
	Ć: 'C\u0301',
	Ę: 'E\u0328',
	Ł: 'L\u0337',
	Ń: 'N\u0301',
	Ś: 'S\u0301',
	Ź: 'Z\u0301',
	Ż: 'Z\u0307'
};

export const boldHandler: Handler<void> = (text) => {
	if (text.length === 0) return text;

	const firstChar = text.trimStart().charAt(0);

	if (Object.keys(boldMap).length === 0) {
		buildBoldMap();
	}

	if (isNormalUnicode(firstChar)) {
		return splitByMaxLength(text).map(convertCharToBold).join('');
	} else {
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
