<script lang="ts">
	import { text } from '$lib/stores/text.store';
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import TextPreview from '$lib/components/TextPreview.svelte';

	const name = 'John Doe';
	const degree = '3e et +';
	const position = 'Developer at @Boldify';
	const timePosted = '4 h';
</script>

<section id="text-preview" class="py-12">
	<div class="container mx-auto px-4 lg:px-8 text-center mb-8">
		<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
			{$t('preview.section_title')}
		</h2>
		<div class="h-1 w-24 bg-blue-600 mx-auto mb-6 rounded-full"></div>
		<p class="text-lg text-gray-600 max-w-2xl mx-auto">
			{$t('preview.section_description')}
		</p>
	</div>

	<div
		class="preview-container w-full max-w-xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-xl rounded-xl flex flex-col h-fit animate-fade-in"
		transition:fade={{ duration: 300 }}
	>
		<div
			class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
		>
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 mr-2"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
					></path>
				</svg>
				<p class="font-semibold">
					{$t('preview.title')}
				</p>
			</div>
		</div>

		<div class="bg-gray-100 p-3 flex-1">
			<TextPreview {name} {degree} {position} {timePosted} text={$text} smallButtons={false} />
		</div>
	</div>
</section>

<style lang="scss">
	.animate-fade-in {
		animation: fadeIn 0.5s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.preview-container {
		max-height: 680px;
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.1),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
	}
</style>
