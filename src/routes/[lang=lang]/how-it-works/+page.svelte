<script lang="ts">
	import { t } from 'svelte-i18n';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { locale } from '$lib/services/i18n.service';

	const languages = [
		{ lang: 'en', url: 'https://boldify.net/en/how-it-works' },
		{ lang: 'fr', url: 'https://boldify.net/fr/how-it-works' }
	];
</script>

<SEOHead
	title={$t('how_it_works.title')}
	description={$t('how_it_works.description')}
	keywords={$t('how_it_works.keywords')}
	canonicalUrl="https://boldify.net/{$locale}/how-it-works"
	{languages}
/>

<div class="container mx-auto px-4 py-8">
	<!-- Hero Section -->
	<section class="text-center mb-12">
		<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
			{$t('how_it_works.hero_title')}
		</h1>
		<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
			{$t('how_it_works.hero_description')}
		</p>
		<div class="flex flex-wrap justify-center gap-4 text-sm">
			<span class="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium">
				🎯 {$t('common.linkedin_optimized')}
			</span>
			<span class="bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium">
				⚡ {$t('common.instant_results')}
			</span>
			<span class="bg-purple-50 text-purple-700 px-4 py-2 rounded-full font-medium">
				🆓 {$t('common.free_100')}
			</span>
		</div>
	</section>

	<!-- Bold Text Examples -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-center mb-8">
			{$t('how_it_works.transform_title')}
		</h2>
		<div class="bg-gray-50 rounded-xl p-8">
			<div class="grid md:grid-cols-2 gap-8 items-center">
				<div>
					<h3 class="text-lg font-semibold mb-4">
						{$t('how_it_works.regular_text')}
					</h3>
					<div class="bg-white p-4 rounded-lg border">
						<p class="text-gray-700">
							{$t('how_it_works.example_regular')}
						</p>
					</div>
				</div>
				<div>
					<h3 class="text-lg font-semibold mb-4">
						{$t('how_it_works.bold_text')}
					</h3>
					<div class="bg-white p-4 rounded-lg border border-blue-200">
						<p class="text-gray-700">
							{$t('how_it_works.example_bold')}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA to Main Editor -->
	<section
		class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 mb-12 text-center"
	>
		<h2 class="text-3xl font-bold mb-4">
			{$t('how_it_works.cta_title')}
		</h2>
		<p class="text-xl mb-8 opacity-90">
			{$t('how_it_works.cta_description')}
		</p>
		<a
			href="/{$locale}#text-editor"
			class="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
		>
			{$t('how_it_works.cta_button')}
			<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 7l5 5m0 0l-5 5m5-5H6"
				/>
			</svg>
		</a>
	</section>

	<!-- Why Bold Text Works -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-center mb-8">
			{$t('how_it_works.why_works_title')}
		</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			<div class="text-center p-6 bg-white rounded-xl shadow-sm border">
				<div
					class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<span class="text-2xl">👁️</span>
				</div>
				<h3 class="font-semibold mb-2">
					{$t('how_it_works.catches_eyes')}
				</h3>
				<p class="text-sm text-gray-600">
					{$t('how_it_works.catches_eyes_desc')}
				</p>
			</div>
			<div class="text-center p-6 bg-white rounded-xl shadow-sm border">
				<div
					class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<span class="text-2xl">📈</span>
				</div>
				<h3 class="font-semibold mb-2">
					{$t('how_it_works.higher_engagement')}
				</h3>
				<p class="text-sm text-gray-600">
					{$t('how_it_works.higher_engagement_desc')}
				</p>
			</div>
			<div class="text-center p-6 bg-white rounded-xl shadow-sm border">
				<div
					class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<span class="text-2xl">🎯</span>
				</div>
				<h3 class="font-semibold mb-2">
					{$t('how_it_works.key_points')}
				</h3>
				<p class="text-sm text-gray-600">
					{$t('how_it_works.key_points_desc')}
				</p>
			</div>
			<div class="text-center p-6 bg-white rounded-xl shadow-sm border">
				<div
					class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<span class="text-2xl">💼</span>
				</div>
				<h3 class="font-semibold mb-2">
					{$t('how_it_works.professional')}
				</h3>
				<p class="text-sm text-gray-600">
					{$t('how_it_works.professional_desc')}
				</p>
			</div>
		</div>
	</section>

	<!-- Step by Step Guide -->
	<section class="bg-gray-50 rounded-2xl p-8 mb-12">
		<h2 class="text-3xl font-bold text-center mb-8">
			{$t('how_it_works.how_to_use_title')}
		</h2>
		<div class="space-y-6">
			<div class="flex items-start space-x-4">
				<div
					class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold"
				>
					1
				</div>
				<div>
					<h3 class="font-semibold mb-1">
						{$t('how_it_works.use_step1')}
					</h3>
					<p class="text-gray-600">
						{$t('how_it_works.use_step1_desc')}
					</p>
				</div>
			</div>
			<div class="flex items-start space-x-4">
				<div
					class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold"
				>
					2
				</div>
				<div>
					<h3 class="font-semibold mb-1">
						{$t('how_it_works.use_step2')}
					</h3>
					<p class="text-gray-600">
						{$t('how_it_works.use_step2_desc')}
					</p>
				</div>
			</div>
			<div class="flex items-start space-x-4">
				<div
					class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold"
				>
					3
				</div>
				<div>
					<h3 class="font-semibold mb-1">
						{$t('how_it_works.use_step3')}
					</h3>
					<p class="text-gray-600">
						{$t('how_it_works.use_step3_desc')}
					</p>
				</div>
			</div>
			<div class="flex items-start space-x-4">
				<div
					class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold"
				>
					4
				</div>
				<div>
					<h3 class="font-semibold mb-1">
						{$t('how_it_works.use_step4')}
					</h3>
					<p class="text-gray-600">
						{$t('how_it_works.use_step4_desc')}
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
