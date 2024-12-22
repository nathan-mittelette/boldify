import type { Handler } from '$lib/handlers/handler';

const underlineCode = 0x0332;

export const underlineHandler: Handler<void> = (text) => {
	if (text.length === 0) return text;

	const firstChar = text.trimStart().charAt(1);

	if (firstChar.codePointAt(0) === underlineCode) {
		return convertTextToNormal(text);
	} else {
		return convertTextToUnderline(text);
	}
};

const convertTextToNormal = (text: string): string => {
	return text
		.split('')
		.map((char) => (char.codePointAt(0) === underlineCode ? '' : char))
		.join('');
};

const convertTextToUnderline = (text: string): string => {
	let result = '';
	for (let i = 0; i < text.length; i++) {
		if (!text[i].trim()) {
			result += text[i];
			continue;
		}

		result += text[i] + String.fromCodePoint(underlineCode);
	}

	return result;
};
