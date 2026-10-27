<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type Quill from 'quill';
	import { get } from 'svelte/store';
	import PostCounter from './PostCounter.svelte';
	import { platforms, type Platform } from '#lib/models/platform.model.js';
	import { extractPostContent } from '#lib/utils/post-content.js';
	import { text, draftEdited } from '#lib/stores/text.store.js';
	import { handleUpdateToText } from '#lib/handlers/handler.js';
	import { boldHandler } from '#lib/handlers/bold.handler.js';
	import { italicHandler } from '#lib/handlers/italic.handler.js';
	import { underlineHandler } from '#lib/handlers/underline.handler.js';
	import { strikeHandler } from '#lib/handlers/strike.handler.js';
	import { overlineHandler } from '#lib/handlers/overline.handler.js';
	import { locale } from 'svelte-i18n';
	import { platformTranslations } from '#lib/services/platform-i18n.service.js';
	const t = platformTranslations();
	import { listHandler, type ListType } from '#lib/handlers/list.handler.js';
	import { browser } from '$app/env';
	import { addSnackbar } from '#lib/stores/snackbar.store.js';
	import type { Snackbar } from '#lib/models/snackbar.model.js';
	import {
		trackFormatUsed,
		trackTextCopied,
		trackTextPasted
	} from '#lib/services/clarity.service.js';
	import { onCopy } from '#lib/services/donation-toast.service.js';
	import { triggerCoffeeCue } from '#lib/stores/coffee-cue.store.js';
	import { prepareTextForLinkedIn } from '#lib/utils/linkedin-text.js';

	let { platform = 'linkedin' }: { platform?: Platform } = $props();
	const config = $derived(platforms[platform]);
	const editorKey = (key: string) => `${config.i18n}.${key}`;
	let disposed = false;

	let editorRef: HTMLDivElement;
	let toolbarRef: HTMLDivElement;
	let observer: MutationObserver;

	const copyToClipboard = async () => {
		// LinkedIn strips truly empty lines on paste — put a zero-width space on them.
		// X (Twitter) is not affected: copy the raw text there.
		const textToCopy = platform === 'linkedin' ? prepareTextForLinkedIn($text) : $text;
		await navigator.clipboard.writeText(textToCopy);
		trackTextCopied($text);

		// arm the donation toast; it fires later at a natural moment (tab return / re-copy / safety delay)
		onCopy();
		// play a one-shot steam cue on the navbar coffee button (the converting channel)
		triggerCoffeeCue();

		addSnackbar({
			title: $t('editor.copied'),
			description: $t(editorKey('copied_description'))
		} as Snackbar);
	};

	function applyFormat(format: 'bold' | 'italic' | 'underline' | 'strike' | 'overline') {
		trackFormatUsed(format);

		const handlers = {
			bold: boldHandler,
			italic: italicHandler,
			underline: underlineHandler,
			strike: strikeHandler,
			overline: overlineHandler
		};

		handleUpdateToText(editor, handlers[format]);
	}

	function applyListFormat(data: ListType) {
		trackFormatUsed(data === 'ordered' ? 'ordered_list' : 'bullet_list');
		handleUpdateToText(editor, listHandler, data);
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		e.stopImmediatePropagation();
		trackTextPasted();
		const plainText = e.clipboardData?.getData('text/plain') ?? '';
		const range = editor.getSelection() ?? { index: editor.getLength() - 1, length: 0 };
		editor.deleteText(range.index, range.length, 'user');
		editor.insertText(range.index, plainText, 'user');
		editor.setSelection(range.index + plainText.length, 0, 'silent');
	}

	let editor: Quill;

	// Separate reactive flag — avoids wrapping the Quill instance in a Svelte proxy
	let editorReady = $state(false);

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

		const [{ default: Quill }] = await Promise.all([
			import('quill'),
			import('quill/dist/quill.snow.css') as unknown as Promise<{ default: unknown }>
		]);

		if (disposed) return;

		const options = {
			theme: 'snow',
			history: {
				delay: 1000,
				maxStack: 100,
				userOnly: true
			},
			modules: {
				toolbar: {
					container: toolbarRef,
					handlers: {
						bold: () => applyFormat('bold'),
						italic: () => applyFormat('italic'),
						underline: () => applyFormat('underline'),
						strike: () => applyFormat('strike'),
						overline: () => applyFormat('overline'),
						undo: () => editor.history.undo(),
						redo: () => editor.history.redo(),
						list: applyListFormat
					}
				}
			},
			placeholder: $t(editorKey('placeholder'))
		};

		editor = new Quill(editorRef, options);
		if (get(draftEdited)) editor.setText(get(text) + '\n', 'silent');
		// Signal readiness — triggers $effect to set the initial text
		editorReady = true;
		editor.root.addEventListener('paste', handlePaste, true);

		editor.on('text-change', () => {
			draftEdited.set(true);
			text.set(extractPostContent(editor.getText()));
		});
	});

	$effect(() => {
		const defaultText = $t(editorKey('default_text'));
		const placeholder = $t(editorKey('placeholder'));
		if (editorReady) {
			editor.root.dataset.placeholder = placeholder;
			if (!$draftEdited) {
				editor.setText(defaultText + '\n', 'silent');
				text.set(defaultText);
			}
		}
	});

	onDestroy(() => {
		disposed = true;
		observer?.disconnect();
		editor?.root.removeEventListener('paste', handlePaste, true);
	});
</script>

<section id="text-editor" class="section bg-white">
	<div class="container mx-auto px-4 lg:px-8 text-center">
		<h2 class="text-3xl md:text-4xl font-bold mb-6">
			{$t('editor.section_title')}
		</h2>
		<div class="h-1 w-24 bg-primary mx-auto mb-6 rounded-full"></div>
		<p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-12">
			{$t('editor.section_description')}
		</p>
		<article
			class="max-w-3xl mx-auto md:p-6 p-4 overflow-visible w-full max-h-[70vh] h-fit animate-fade-in"
			data-clarity-mask="true"
		>
			<div id="toolbar" class="rounded-t-lg" bind:this={toolbarRef}>
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
					{#if config.formats.includes('underline')}<button
							type="button"
							class="ql-underline"
							aria-pressed="false"
							aria-label="underline"
						></button>{/if}
					<button type="button" class="ql-strike" aria-pressed="false" aria-label="strike"></button>
					{#if config.formats.includes('overline')}<button
							type="button"
							class="ql-overline"
							aria-pressed="false"
							aria-label="overline"
						>
							<svg viewBox="0 0 18 18"
								><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
								></path>
								<rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="14" x="2" y="0"
								></rect></svg
							>
						</button>{/if}
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
				<button
					onclick={copyToClipboard}
					class="btn btn-primary py-2 px-4 text-sm cursor-pointer"
					aria-label="Copy to clipboard"
				>
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
				<PostCounter {platform} content={$text} />
			</div>
			{#if platform === 'x'}<p class="text-sm text-neutral-600 mt-3">{$t('x.copy_hint')}</p>{/if}
		</article>
	</div>
	{#if $locale === 'tr'}
		<div
			class="mt-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700"
		>
			{$t('editor.unicode_limitation_notice')}
		</div>
	{/if}
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
		min-height: 200px;

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
