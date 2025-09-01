<script lang="ts">
	import { t } from 'svelte-i18n';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { locale } from '$lib/services/i18n.service';

	const languages = [
		{ lang: 'en', url: 'https://boldify.net/en/about' },
		{ lang: 'fr', url: 'https://boldify.net/fr/about' }
	];
</script>

<SEOHead
	title={$t('about.title')}
	description={$t('about.description')}
	keywords={$t('about.keywords')}
	canonicalUrl="https://boldify.net/about"
	{languages}
/>

<div class="container mx-auto px-4 py-8">
	<!-- Hero Section -->
	<section class="text-center mb-12">
		<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
			{$t('about.hero_title')}
		</h1>
		<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
			{$t('about.hero_description')}
		</p>
		<div class="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
			<span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
				>✨ {$t('common.instant_preview')}</span
			>
			<span class="bg-green-50 text-green-700 px-3 py-1 rounded-full"
				>🆓 {$t('common.free_tool')}</span
			>
			<span class="bg-purple-50 text-purple-700 px-3 py-1 rounded-full"
				>⚡ {$t('common.no_registration')}</span
			>
		</div>
	</section>

	<!-- Features Section -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-center mb-8">
			{$t('about.why_title')}
		</h2>
		<div class="grid md:grid-cols-3 gap-8">
			<div class="text-center">
				<div
					class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<span class="text-2xl">𝗕</span>
				</div>
				<h3 class="text-xl font-semibold mb-3">
					{$t('about.bold_generator_title')}
				</h3>
				<p class="text-gray-600">
					{$t('about.bold_generator_desc')}
				</p>
			</div>
			<div class="text-center">
				<div
					class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<span class="text-2xl">𝘐</span>
				</div>
				<h3 class="text-xl font-semibold mb-3">
					{$t('about.italic_formatting_title')}
				</h3>
				<p class="text-gray-600">
					{$t('about.italic_formatting_desc')}
				</p>
			</div>
			<div class="text-center">
				<div
					class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<span class="text-2xl">📋</span>
				</div>
				<h3 class="text-xl font-semibold mb-3">
					{$t('about.copy_ready_title')}
				</h3>
				<p class="text-gray-600">
					{$t('about.copy_ready_desc')}
				</p>
			</div>
		</div>
	</section>

	<!-- CTA to Main Editor -->
	<section
		class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 mb-12 text-center"
	>
		<h2 class="text-3xl font-bold mb-4">
			{$t('about.cta_title')}
		</h2>
		<p class="text-xl mb-8 opacity-90">
			{$t('about.cta_description')}
		</p>
		<a
			href="/{$locale}#text-editor"
			class="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
		>
			{$t('about.cta_button')}
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

	<!-- How it works -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-center mb-8">
			{$t('about.how_to_title')}
		</h2>
		<div class="grid md:grid-cols-3 gap-6">
			<div class="text-center">
				<div
					class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
				>
					1
				</div>
				<h3 class="font-semibold mb-2">
					{$t('about.step1_title')}
				</h3>
				<p class="text-gray-600">
					{$t('about.step1_desc')}
				</p>
			</div>
			<div class="text-center">
				<div
					class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
				>
					2
				</div>
				<h3 class="font-semibold mb-2">
					{$t('about.step2_title')}
				</h3>
				<p class="text-gray-600">
					{$t('about.step2_desc')}
				</p>
			</div>
			<div class="text-center">
				<div
					class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
				>
					3
				</div>
				<h3 class="font-semibold mb-2">
					{$t('about.step3_title')}
				</h3>
				<p class="text-gray-600">
					{$t('about.step3_desc')}
				</p>
			</div>
		</div>
	</section>

	<!-- Benefits -->
	<section class="bg-blue-50 rounded-2xl p-8 mb-12">
		<h2 class="text-3xl font-bold text-center mb-8">
			{$t('about.benefits_title')}
		</h2>
		<div class="grid md:grid-cols-2 gap-6">
			<div class="flex items-start space-x-4">
				<div
					class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
				>
					<span class="text-white text-sm">✓</span>
				</div>
				<div>
					<h3 class="font-semibold mb-1">
						{$t('about.benefit1_title')}
					</h3>
					<p class="text-gray-600">
						{$t('about.benefit1_desc')}
					</p>
				</div>
			</div>
			<div class="flex items-start space-x-4">
				<div
					class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
				>
					<span class="text-white text-sm">✓</span>
				</div>
				<div>
					<h3 class="font-semibold mb-1">
						{$t('about.benefit2_title')}
					</h3>
					<p class="text-gray-600">
						{$t('about.benefit2_desc')}
					</p>
				</div>
			</div>
			<div class="flex items-start space-x-4">
				<div
					class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
				>
					<span class="text-white text-sm">✓</span>
				</div>
				<div>
					<h3 class="font-semibold mb-1">
						{$t('about.benefit3_title')}
					</h3>
					<p class="text-gray-600">
						{$t('about.benefit3_desc')}
					</p>
				</div>
			</div>
			<div class="flex items-start space-x-4">
				<div
					class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
				>
					<span class="text-white text-sm">✓</span>
				</div>
				<div>
					<h3 class="font-semibold mb-1">
						{$t('about.benefit4_title')}
					</h3>
					<p class="text-gray-600">
						{$t('about.benefit4_desc')}
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
