<script lang="ts">
	import Intro from '$lib/components/Intro.svelte';
	import Contribution from '$lib/components/Contribute.svelte';
	import TextEditor from '$lib/components/TextEditor.svelte';
	import TextPreviewContainer from '$lib/components/TextPreviewContainer.svelte';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { t } from 'svelte-i18n';

	const languages = [
		{ lang: 'en', url: 'https://boldify.net/en' },
		{ lang: 'fr', url: 'https://boldify.net/fr' }
	];

	const productSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: 'Boldify - Formatage Gras LinkedIn',
		description: $t('introduction.description'),
		url: 'https://boldify.net/',
		image: 'https://boldify.net/favicon-96x96.png',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'EUR',
			availability: 'https://schema.org/InStock',
			url: 'https://boldify.net/'
		}
	});
</script>

<SEOHead
	title={$t('home.title')}
	description={$t('home.description')}
	keywords={$t('home.keywords')}
	canonicalUrl="https://boldify.net/"
	{languages}
/>

<JsonLd schema={productSchema} />

<div class="flex flex-col min-h-screen">
	<!-- Hero Section -->
	<Intro />

	<!-- Text Editor & Preview Section -->
	<section
		class="editor-preview-section py-16 lg:py-24 px-4 bg-neutral-50 relative overflow-hidden"
		id="text-editor"
	>
		<div
			class="hidden lg:block absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent opacity-70"
		></div>

		<div class="container mx-auto">
			<div class="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
				<div class="w-full lg:w-1/2">
					<TextEditor />
				</div>
				<div class="w-full lg:w-1/2 lg:mt-0 mt-8">
					<TextPreviewContainer />
				</div>
			</div>
		</div>

		<div
			class="hidden lg:block absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent opacity-70"
		></div>
	</section>

	<!-- Contribution Section -->
	<Contribution />
</div>

<style lang="scss">
	.editor-preview-section {
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url('/pattern.svg');
			background-size: 100px;
			opacity: 0.05;
			z-index: 0;
		}

		> * {
			position: relative;
			z-index: 1;
		}
	}
</style>
