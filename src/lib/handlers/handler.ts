import type Quill from 'quill';

export type Handler<T> = (text: string, args?: T) => string;

export const handleUpdateToText = <T>(editor: Quill, handler: Handler<T>, args?: T): void => {
	const range = editor.getSelection();
	if (range && range.length > 0) {
		const selectedText = editor.getText(range.index, range.length);
		const transformedText = handler(selectedText, args);
		editor.deleteText(range.index, range.length);
		editor.insertText(range.index, transformedText);
		editor.setSelection(range.index, transformedText.length);
	}
};
