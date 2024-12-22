import type { Handler } from '$lib/handlers/handler';

const strikeCode = 0x0336;

export const strikeHandler: Handler<void> = (text) => {
	if (text.length === 0) return text;

	const firstChar = text.trimStart().charAt(1);

	if (firstChar.codePointAt(0) === strikeCode) {
		return convertTextToNormal(text);
	} else {
		return convertTextToStrike(text);
	}
};

const convertTextToNormal = (text: string): string => {
	return text
		.split('')
		.map((char) => (char.codePointAt(0) === strikeCode ? '' : char))
		.join('');
};

const convertTextToStrike = (text: string): string => {
	let result = '';
	for (let i = 0; i < text.length; i++) {
		if (!text[i].trim()) {
			result += text[i];
			continue;
		}

		result += text[i] + String.fromCodePoint(strikeCode);
	}

	return result;
};
