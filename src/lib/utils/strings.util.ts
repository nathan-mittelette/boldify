export const isUpper = (str: string) => {
	return 'A'.codePointAt(0)! <= str.codePointAt(0)! && str.codePointAt(0)! <= 'Z'.codePointAt(0)!;
};

export const isLower = (str: string) => {
	return 'a'.codePointAt(0)! <= str.codePointAt(0)! && str.codePointAt(0)! <= 'z'.codePointAt(0)!;
};

export const isNumber = (str: string) => {
	return '0'.codePointAt(0)! <= str.codePointAt(0)! && str.codePointAt(0)! <= '9'.codePointAt(0)!;
};
