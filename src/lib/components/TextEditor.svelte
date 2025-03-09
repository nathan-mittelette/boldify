<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
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
	import type { Snackbar } from '$lib/models/snackbar.model';

	const MAX_CHARACTERS = 3000;

	const getProgressColor = (nbCharcters: number) => {
		const percent = ((MAX_CHARACTERS - nbCharcters) / MAX_CHARACTERS) * 100;
		const hue = (percent / 100) * 120; // Maps percent to range from red (0) to green (120)
		return `hsl(${hue}, 80%, 30%)`; // Softer green with reduced saturation and brightness
	};

	let characters = $derived<number>($text.length - 1); // -1 because Quill adds a newline character

	let editorRef: HTMLDivElement;
	let observer: MutationObserver;

	const copyToClipboard = () => {
		navigator.clipboard.writeText($text);
		addSnackbar({
			title: $t('editor.copied'),
			description: $t('editor.copied_description')
		} as Snackbar);
	};

	let editor: Quill;

	onMount(async () => {
		if (!browser) return;

		if (editorRef) {
			observer = new MutationObserver(() => {
				const tooltips = editorRef.querySelectorAll('.ql-tooltip');
				tooltips.forEach((tooltip) => tooltip.remove());
			});

			observer.observe(editorRef, {
				childList: true,
				subtree: true
			});
		}

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

		editor.setText($t('editor.default_text'));
		text.set($t('editor.default_text'));

		editor.on('text-change', () => {
			const content = editor.getText();

			if (content.trim()) {
				text.set(content);
			} else {
				text.set($t('editor.placeholder') + ' ');
			}
		});
	});

	onDestroy(() => {
		if (observer) {
			return () => observer.disconnect();
		}
	});
</script>

<section id="text-editor" class="section bg-white">
	<div class="container mx-auto px-4 lg:px-8 text-center">
		<h2 class="text-3xl md:text-4xl font-bold mb-6">
			{$t('editor.section_title')}
		</h2>
		<div class="h-1 w-24 bg-blue-600 mx-auto mb-6 rounded-full"></div>
		<p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-12">
			{$t('editor.section_description')}
		</p>
		<article
			class="max-w-3xl mx-auto md:p-6 p-4 overflow-visible w-full max-h-[70vh] h-fit animate-fade-in"
		>
			<div id="toolbar" class="rounded-t-lg">
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
			<div id="editor" bind:this={editorRef}></div>
			<div
				class="w-full text-editor-actions rounded-b bg-white p-3 flex flex-wrap justify-between items-center gap-2"
			>
				<button onclick={copyToClipboard} class="btn btn-primary py-2 px-4 text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="size-4 mr-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
						/>
					</svg>
					{$t('editor.copy')}
				</button>
				<div
					class="text-sm font-medium py-1 px-3 rounded-full"
					style="background-color: {getProgressColor(characters)}25; color: {getProgressColor(
						characters
					)};"
				>
					<span class="flex items-center">
						<svg
							class="w-4 h-4 mr-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
						{characters} / {MAX_CHARACTERS}
						{$t('editor.characters')}
					</span>
				</div>
			</div>
		</article>
	</div>
</section>

<style lang="scss">
	#toolbar,
	#editor,
	.text-editor-actions {
		border: 1px solid var(--color-neutral-200);
	}

	#toolbar {
		min-height: 46px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		background-color: var(--color-white);
		border-bottom-width: 0;
	}

	#editor {
		border-top: none;
		border-bottom: none;
		background-color: var(--color-white);

		:global(.ql-editor) {
			min-height: 200px;
			max-height: calc(60vh - 46px - 46px);
			font-family: 'Inter', sans-serif;
		}
	}

	.ql-formats {
		margin-right: 15px !important;
	}

	:global(.ql-toolbar.ql-snow .ql-formats) {
		margin-right: 15px;
	}

	:global(.ql-snow .ql-stroke) {
		stroke: var(--color-neutral-700);
	}

	:global(.ql-snow .ql-fill) {
		fill: var(--color-neutral-700);
	}

	:global(.ql-snow.ql-toolbar button:hover),
	:global(.ql-snow .ql-toolbar button:hover) {
		color: var(--color-primary);
	}

	:global(.ql-snow.ql-toolbar button:hover .ql-stroke),
	:global(.ql-snow .ql-toolbar button:hover .ql-stroke) {
		stroke: var(--color-primary);
	}

	:global(.ql-snow.ql-toolbar button:hover .ql-fill),
	:global(.ql-snow .ql-toolbar button:hover .ql-fill) {
		fill: var(--color-primary);
	}

	:global(.ql-snow.ql-toolbar button.ql-active),
	:global(.ql-snow .ql-toolbar button.ql-active) {
		color: var(--color-primary);
	}

	:global(.ql-snow.ql-toolbar button.ql-active .ql-stroke),
	:global(.ql-snow .ql-toolbar button.ql-active .ql-stroke) {
		stroke: var(--color-primary);
	}

	:global(.ql-snow.ql-toolbar button.ql-active .ql-fill),
	:global(.ql-snow .ql-toolbar button.ql-active .ql-fill) {
		fill: var(--color-primary);
	}
</style>
