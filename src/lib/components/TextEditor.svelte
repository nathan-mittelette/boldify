<script lang="ts">
	import { onMount } from 'svelte';
	import Quill from 'quill';
	import { text } from '$lib/stores/text.store';
	import 'quill/dist/quill.snow.css';
	import { handleUpdateToText } from '$lib/handlers/handler';
	import { boldHandler } from '$lib/handlers/bold.handler';

	let editor: Quill;

	onMount(() => {
		const options = {
			theme: 'snow',
			modules: {
				toolbar: {
					container: [
						['bold', 'italic', 'underline', 'strike'],
						[{ list: 'ordered' }, { list: 'bullet' }]
					],
					handlers: {
						bold: () => handleUpdateToText(editor, boldHandler)
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

<article class="max-xl:w-[50vw] w-[30vw] max-h-[80vh] h-fit">
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
