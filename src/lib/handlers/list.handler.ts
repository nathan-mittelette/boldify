import type { Handler } from './handler';

export type ListType = 'ordered' | 'bullet';

const BULLET_FIRST_CHAR = '•';
const ORDERED_REGEX = /^\d+\. /;

export const listHandler: Handler<ListType> = (text: string, args?: ListType): string => {
	if (text.length === 0) return text;

	const firstChar = text.trimStart().charAt(0);

	if (args === 'bullet') {
		if (firstChar === BULLET_FIRST_CHAR) {
			return convertFromBulletToNormal(text);
		} else {
			return convertTextToBullet(text);
		}
	} else if (args === 'ordered') {
		if (ORDERED_REGEX.test(text)) {
			return convertFromOrderedToNormal(text);
		} else {
			return convertTextToOrdered(text);
		}
	}

	return text;
};

const convertFromBulletToNormal = (text: string): string => {
	return text
		.split('\n')
		.map((line) =>
			line.charAt(0) === BULLET_FIRST_CHAR ? line.replace(BULLET_FIRST_CHAR + ' ', '') : line
		)
		.join('\n');
};

const convertTextToBullet = (text: string): string => {
	return text
		.split('\n')
		.map((line) => (line.charAt(0) === BULLET_FIRST_CHAR ? line : BULLET_FIRST_CHAR + ' ' + line))
		.join('\n');
};

const convertFromOrderedToNormal = (text: string): string => {
	return text
		.split('\n')
		.map((line) => (ORDERED_REGEX.test(line) ? line.replace(ORDERED_REGEX, '') : line))
		.join('\n');
};

const convertTextToOrdered = (text: string): string => {
	return text
		.split('\n')
		.map((line, index) => (ORDERED_REGEX.test(line) ? line : index + 1 + '. ' + line))
		.join('\n');
};
