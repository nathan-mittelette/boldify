<script lang="ts">
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	import type Quill from 'quill';
	import { text } from '$lib/stores/text.store';
	import { handleUpdateToText } from '$lib/handlers/handler';
	import { boldHandler } from '$lib/handlers/bold.handler';
	import { italicHandler } from '$lib/handlers/italic.handler';
	import { underlineHandler } from '$lib/handlers/underline.handler';
	import { strikeHandler } from '$lib/handlers/strike.handler';
	import { overlineHandler } from '$lib/handlers/overline.handler';
	import { t } from 'svelte-i18n';
	import { listHandler, type ListType } from '$lib/handlers/list.handler';
	import { browser } from '$app/environment';
	import { addSnackbar } from '$lib/stores/snackbar.store';

	const MAX_CHARACTERS = 3000;

	const getProgressColor = (nbCharcters: number) => {
		const percent = ((MAX_CHARACTERS - nbCharcters) / MAX_CHARACTERS) * 100;
		const hue = (percent / 100) * 120; // Maps percent to range from red (0) to green (120)
		return `hsl(${hue}, 80%, 40%)`; // Softer green with reduced saturation and brightness
	};

	let characters = $derived<number>($text.length - 1); // -1 because Quill adds a newline character

	const copyToClipboard = () => {
		navigator.clipboard.writeText($text);
		addSnackbar({
			title: $t('editor.copied'),
			description: $t('editor.copied_description')
		});
	};

	let editor: Quill;

	onMount(async () => {
		if (!browser) return;

		const Quill = (await import('quill')).default;

		const options = {
			theme: 'snow',
			history: {
				delay: 1000,
				maxStack: 100,
				userOnly: true
			},
			modules: {
				toolbar: {
					container: '#toolbar',
					handlers: {
						bold: () => handleUpdateToText(editor, boldHandler),
						italic: () => handleUpdateToText(editor, italicHandler),
						underline: () => handleUpdateToText(editor, underlineHandler),
						strike: () => handleUpdateToText(editor, strikeHandler),
						overline: () => handleUpdateToText(editor, overlineHandler),
						undo: () => editor.history.undo(),
						redo: () => editor.history.redo(),
						list: (data: ListType) => handleUpdateToText(editor, listHandler, data)
					}
				}
			},
			placeholder: $t('editor.placeholder')
		};

		editor = new Quill('#editor', options);

		text.set($t('editor.placeholder') + ' ');

		editor.on('text-change', () => {
			const content = editor.getText();

			if (content.trim()) {
				text.set(content);
			} else {
				text.set($t('editor.placeholder') + ' ');
			}
		});
	});
</script>

<article class="max-md:w-[90vw] md:max-w-[50vw] min-w-[30vw] max-h-[80vh] h-fit">
	<div id="toolbar">
		<span class="ql-formats">
			<button type="button" class="ql-undo" aria-pressed="false" aria-label="undo">
				<svg viewBox="0 0 24 24"><path class="ql-stroke" d="M15 19l-7-7 7-7v14z" /></svg>
			</button>
			<button type="button" class="ql-redo" aria-pressed="false" aria-label="redo">
				<svg viewBox="0 0 24 24"><path class="ql-stroke" d="M9 5l7 7-7 7V5z" /></svg>
			</button>
		</span>
		<span class="ql-formats">
			<button type="button" class="ql-bold" aria-pressed="false" aria-label="bold"></button>
			<button type="button" class="ql-italic" aria-pressed="false" aria-label="italic"></button>
			<button type="button" class="ql-underline" aria-pressed="false" aria-label="underline"
			></button>
			<button type="button" class="ql-strike" aria-pressed="false" aria-label="strike"></button>
			<button type="button" class="ql-overline" aria-pressed="false" aria-label="overline">
				<svg viewBox="0 0 18 18"
					><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
					></path>
					<rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="14" x="2" y="0"></rect></svg
				>
			</button>
		</span>
		<span class="ql-formats">
			<button
				type="button"
				class="ql-list"
				value="ordered"
				aria-pressed="false"
				aria-label="ordered list"
			></button>
			<button
				type="button"
				class="ql-list"
				value="bullet"
				aria-pressed="false"
				aria-label="bullet list"
			></button>
		</span>
	</div>
	<div id="editor"></div>
	<div
		class="w-full text-editor-actions rounded-b bg-white shadow p-2 flex justify-between items-center"
	>
		<button
			onclick={copyToClipboard}
			class="flex items-center bg-secondary text-sm font-light text-white px-3 py-1 rounded-md hover:brightness-110"
		>
			<span class="mr-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="16px"
					viewBox="0 -960 960 960"
					width="16px"
					fill="#FFFFFF"
					><path
						d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
					/></svg
				>
			</span>
			{$t('editor.copy')}
		</button>
		<span class="text-sm" style="color: {getProgressColor(characters)}">
			{characters} / {MAX_CHARACTERS}
			{$t('editor.characters')}
		</span>
	</div>
</article>

<style lang="scss">
	#toolbar,
	#editor,
	.text-editor-actions {
		border: 1px solid rgb(140, 140, 140, 0.2);
	}

	#toolbar {
		height: 46px;
	}

	#editor {
		border-top: none;
		border-bottom: none;

		:global(.ql-editor) {
			max-height: calc(80vh - 46px - 46px);
		}
	}
</style>
