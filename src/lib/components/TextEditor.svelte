<script lang="ts">
	import { onMount } from 'svelte';
	import Quill from 'quill';
	import 'quill/dist/quill.snow.css';
	import { text } from '$lib/stores/text.store';
	import { handleUpdateToText } from '$lib/handlers/handler';
	import { boldHandler } from '$lib/handlers/bold.handler';
	import { italicHandler } from '$lib/handlers/italic.handler';
	import { underlineHandler } from '$lib/handlers/underline.handler';
	import { strikeHandler } from '$lib/handlers/strike.handler';
	import { overlineHandler } from '$lib/handlers/overline.handler';

	let editor: Quill;

	onMount(() => {
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
						redo: () => editor.history.redo()
					}
				}
			},
			placeholder: 'Composez votre post...'
		};

		editor = new Quill('#editor', options);

		editor.on('text-change', () => {
			text.set(editor.getText());
		});
	});
</script>

<article class="max-md:w-[90vw] min-w-[30vw] max-h-[80vh] h-fit">
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
</article>

<style lang="scss">
	:global(.ql-toolbar) {
		@apply bg-white shadow rounded-t;
	}

	:global(.ql-container) {
		@apply bg-white shadow rounded-b;
	}
</style>
