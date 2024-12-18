import type Quill from 'quill';

export type Handler = (text: string) => string;

export const handleUpdateToText = (editor: Quill, handler: Handler): void => {
	const range = editor.getSelection();
	if (range && range.length > 0) {
		const selectedText = editor.getText(range.index, range.length);
		const transformedText = handler(selectedText);
		editor.deleteText(range.index, range.length);
		editor.insertText(range.index, transformedText);
		editor.setSelection(range.index, transformedText.length);
	}
};
