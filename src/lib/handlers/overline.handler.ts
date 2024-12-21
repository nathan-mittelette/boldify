import type { Handler } from '$lib/handlers/handler';

const overlineCode = 0x0305;

export const overlineHandler: Handler = (text) => {
	if (text.length === 0) return text;

	const firstChar = text.trimStart().charAt(1);

	if (firstChar.codePointAt(0) === overlineCode) {
		return convertTextToNormal(text);
	} else {
		return convertTextToOverline(text);
	}
};

const convertTextToNormal = (text: string): string => {
	return text
		.split('')
		.map((char) => (char.codePointAt(0) === overlineCode ? '' : char))
		.join('');
};

const convertTextToOverline = (text: string): string => {
	let result = '';
	for (let i = 0; i < text.length; i++) {
		if (!text[i].trim()) {
			result += text[i];
			continue;
		}

		result += text[i] + String.fromCodePoint(overlineCode);
	}

	return result;
};
