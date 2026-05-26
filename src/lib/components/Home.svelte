<script lang="ts">
	import Intro from '$lib/components/Intro.svelte';
	import Contribution from '$lib/components/Contribute.svelte';
	import TextEditor from '$lib/components/TextEditor.svelte';
	import TextPreviewContainer from '$lib/components/TextPreviewContainer.svelte';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { t } from 'svelte-i18n';
	import { page } from '$app/state';
	import { buildHomeHreflang } from '$lib/utils/hreflang';

	const languages = buildHomeHreflang();
	const canonicalUrl = $derived(
		!page.params.lang || page.params.lang === 'fr'
			? 'https://boldify.net/'
			: `https://boldify.net/${page.params.lang}`
	);

	const webAppSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Boldify',
		url: 'https://boldify.net/',
		description: $t('introduction.description'),
		applicationCategory: 'UtilitiesApplication',
		operatingSystem: 'Any',
		browserRequirements: 'Requires JavaScript',
		inLanguage: ['en', 'fr', 'es', 'de', 'pt', 'pl', 'tr'],
		isAccessibleForFree: true,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'EUR',
			availability: 'https://schema.org/InStock'
		},
		featureList: [
			'Unicode bold text conversion',
			'Unicode italic text conversion',
			'Strikethrough text formatting',
			'Underline and overline text',
			'Bullet and numbered list formatting',
			'Live LinkedIn preview',
			'MCP server integration'
		],
		screenshot: 'https://boldify.net/favicon-96x96.png',
		creator: {
			'@type': 'Organization',
			name: 'Boldify',
			url: 'https://boldify.net/'
		}
	});
</script>

<SEOHead
	title={$t('home.title')}
	description={$t('home.description')}
	keywords={$t('home.keywords')}
	{canonicalUrl}
	{languages}
/>

<JsonLd schema={webAppSchema} />

<div class="flex flex-col min-h-screen">
	<!-- Compact Hero + Editor above the fold -->
	<section class="dot-pattern pt-10 pb-6 px-4 md:px-8" id="text-editor">
		<div class="max-w-[1200px] mx-auto">
			<!-- Compact header -->
			<div class="text-center mb-8">
				<p
					class="inline-block text-sm font-semibold py-1 px-4 rounded-full bg-primary/10 text-primary border border-primary/30 mb-4"
				>
					<span class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						{$t('introduction.mcp_badge')}
					</span>
				</p>
				<h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
					<span class="gradient-text">{$t('introduction.title')}</span>
				</h1>
				<p class="text-lg text-neutral-600 max-w-2xl mx-auto">
					{$t('introduction.description')}
				</p>
			</div>
			<!-- Editor + Preview -->
			<div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
				<div class="w-full lg:w-1/2">
					<TextEditor />
				</div>
				<div class="w-full lg:w-1/2 lg:mt-0 mt-8">
					<TextPreviewContainer />
				</div>
			</div>
		</div>
	</section>

	<!-- Features / Demo Section (below fold) -->
	<Intro />

	<!-- Contribution Section -->
	<Contribution />
</div>
