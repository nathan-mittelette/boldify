<script lang="ts">
	import { t } from 'svelte-i18n';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { locale } from '$lib/services/i18n.service';
	import { page } from '$app/state';

	let openFAQ = $state<number | null>(null);

	function toggleFAQ(index: number) {
		openFAQ = openFAQ === index ? null : index;
	}

	const languages = [
		{ lang: 'en', url: 'https://boldify.net/en/help' },
		{ lang: 'fr', url: 'https://boldify.net/fr/help' }
	];

	const faqSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		name: 'FAQ - Boldify',
		url: page.url.href,
		mainEntity: [
			{
				'@type': 'Question',
				name: $t('help.faq1_q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: $t('help.faq1_a1') + ' ' + $t('help.faq1_a2')
				}
			},
			{
				'@type': 'Question',
				name: $t('help.faq2_q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: $t('help.faq2_a')
				}
			},
			{
				'@type': 'Question',
				name: $t('help.faq3_q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: $t('help.faq3_a')
				}
			},
			{
				'@type': 'Question',
				name: $t('help.faq4_q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: `
						<p>${$t('help.faq4_a1')}</p>
						<ul>
							<li><strong>${$t('help.faq4_bold')}</strong> - ${$t('help.faq4_bold_desc')}</li>
							<li><strong>${$t('help.faq4_italic')}</strong> - ${$t('help.faq4_italic_desc')}</li>
							<li><strong>${$t('help.faq4_underline')}</strong> - ${$t('help.faq4_underline_desc')}</li>
							<li><strong>${$t('help.faq4_strike')}</strong> - ${$t('help.faq4_strike_desc')}</li>
							<li><strong>${$t('help.faq4_lists')}</strong> - ${$t('help.faq4_lists_desc')}</li>
						</ul>
					`
				}
			},
			{
				'@type': 'Question',
				name: $t('help.faq5_q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: `
						<p>${$t('help.faq5_a1')}</p>
						<ol>
							<li>${$t('help.faq5_step1')}</li>
							<li>${$t('help.faq5_step2')}</li>
							<li>${$t('help.faq5_step3')}</li>
							<li>${$t('help.faq5_step4')}</li>
							<li>${$t('help.faq5_step5')}</li>
						</ol>
					`
				}
			},
			{
				'@type': 'Question',
				name: $t('help.faq6_q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: `
						<p>${$t('help.faq6_a1')}</p>
						<ul>
							<li>${$t('help.faq6_sol1')}</li>
							<li>${$t('help.faq6_sol2')}</li>
							<li>${$t('help.faq6_sol3')}</li>
							<li>${$t('help.faq6_sol4')}</li>
						</ul>
					`
				}
			},
			{
				'@type': 'Question',
				name: $t('help.faq7_q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: `
						<p>${$t('help.faq7_a1')}</p>
						<ul>
							<li>Facebook</li>
							<li>Twitter/X</li>
							<li>Instagram ${$t('help.faq7_captions')}</li>
							<li>WhatsApp</li>
							<li>Telegram</li>
							<li>${$t('help.faq7_email')}</li>
						</ul>
						<p>${$t('help.faq7_a2')}</p>
					`
				}
			}
		]
	});
</script>

<JsonLd schema={faqSchema} />

<SEOHead
	title={$t('help.title')}
	description={$t('help.description')}
	keywords={$t('help.keywords')}
	canonicalUrl="https://boldify.net/{$locale}/help"
	{languages}
/>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Hero Section -->
	<section class="text-center mb-12">
		<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
			{$t('help.hero_title')}
		</h1>
		<p class="text-xl text-gray-600 max-w-3xl mx-auto">
			{$t('help.hero_description')}
		</p>
	</section>

	<!-- Quick Start Guide -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold mb-8">
			{$t('help.quick_start_title')}
		</h2>
		<div class="bg-blue-50 rounded-2xl p-8">
			<div class="grid md:grid-cols-3 gap-6">
				<div class="text-center">
					<div
						class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
					>
						1
					</div>
					<h3 class="font-semibold mb-2">
						{$t('about.step1_title')}
					</h3>
					<p class="text-sm text-gray-600">
						{$t('about.step1_desc')}
					</p>
				</div>
				<div class="text-center">
					<div
						class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
					>
						2
					</div>
					<h3 class="font-semibold mb-2">
						{$t('about.step2_title')}
					</h3>
					<p class="text-sm text-gray-600">
						{$t('about.step2_desc')}
					</p>
				</div>
				<div class="text-center">
					<div
						class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
					>
						3
					</div>
					<h3 class="font-semibold mb-2">
						{$t('about.step3_title')}
					</h3>
					<p class="text-sm text-gray-600">
						{$t('about.step3_desc')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold mb-8">
			{$t('help.faq_title')}
		</h2>
		<div class="space-y-4">
			<!-- FAQ Item 1 -->
			<div class="bg-white border rounded-lg overflow-hidden">
				<button
					class="w-full text-left p-6 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center cursor-pointer"
					onclick={() => toggleFAQ(0)}
				>
					{$t('help.faq1_q')}
					<svg
						class="w-5 h-5 transform transition-transform duration-200 {openFAQ === 0
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				<div
					class="px-6 {openFAQ === 0
						? 'pb-6'
						: ''} transition-all duration-300 ease-in-out {openFAQ === 0
						? 'max-h-96 opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'}"
				>
					<div class="text-gray-600 space-y-3">
						<p>{$t('help.faq1_a1')}</p>
						<p>{$t('help.faq1_a2')}</p>
					</div>
				</div>
			</div>

			<!-- FAQ Item 2 -->
			<div class="bg-white border rounded-lg overflow-hidden">
				<button
					class="w-full text-left p-6 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center cursor-pointer"
					onclick={() => toggleFAQ(1)}
				>
					{$t('help.faq2_q')}
					<svg
						class="w-5 h-5 transform transition-transform duration-200 {openFAQ === 1
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				<div
					class="px-6 {openFAQ === 1
						? 'pb-6'
						: ''} transition-all duration-300 ease-in-out {openFAQ === 1
						? 'max-h-96 opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'}"
				>
					<div class="text-gray-600">
						<p>{$t('help.faq2_a')}</p>
					</div>
				</div>
			</div>

			<!-- FAQ Item 3 -->
			<div class="bg-white border rounded-lg overflow-hidden">
				<button
					class="w-full text-left p-6 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center cursor-pointer"
					onclick={() => toggleFAQ(2)}
				>
					{$t('help.faq3_q')}
					<svg
						class="w-5 h-5 transform transition-transform duration-200 {openFAQ === 2
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				<div
					class="px-6 {openFAQ === 2
						? 'pb-6'
						: ''} transition-all duration-300 ease-in-out {openFAQ === 2
						? 'max-h-96 opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'}"
				>
					<div class="text-gray-600">
						<p>{$t('help.faq3_a')}</p>
					</div>
				</div>
			</div>

			<!-- FAQ Item 4 -->
			<div class="bg-white border rounded-lg overflow-hidden">
				<button
					class="w-full text-left p-6 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center cursor-pointer"
					onclick={() => toggleFAQ(3)}
				>
					{$t('help.faq4_q')}
					<svg
						class="w-5 h-5 transform transition-transform duration-200 {openFAQ === 3
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				<div
					class="px-6 {openFAQ === 3
						? 'pb-6'
						: ''} transition-all duration-300 ease-in-out {openFAQ === 3
						? 'max-h-96 opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'}"
				>
					<div class="text-gray-600">
						<p class="mb-3">{$t('help.faq4_a1')}</p>
						<ul class="list-disc pl-6 space-y-1">
							<li><strong>{$t('help.faq4_bold')}</strong> - {$t('help.faq4_bold_desc')}</li>
							<li><strong>{$t('help.faq4_italic')}</strong> - {$t('help.faq4_italic_desc')}</li>
							<li>
								<strong>{$t('help.faq4_underline')}</strong> - {$t('help.faq4_underline_desc')}
							</li>
							<li><strong>{$t('help.faq4_strike')}</strong> - {$t('help.faq4_strike_desc')}</li>
							<li><strong>{$t('help.faq4_lists')}</strong> - {$t('help.faq4_lists_desc')}</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- FAQ Item 5 -->
			<div class="bg-white border rounded-lg overflow-hidden">
				<button
					class="w-full text-left p-6 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center cursor-pointer"
					onclick={() => toggleFAQ(4)}
				>
					{$t('help.faq5_q')}
					<svg
						class="w-5 h-5 transform transition-transform duration-200 {openFAQ === 4
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				<div
					class="px-6 {openFAQ === 4
						? 'pb-6'
						: ''} transition-all duration-300 ease-in-out {openFAQ === 4
						? 'max-h-96 opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'}"
				>
					<div class="text-gray-600">
						<p class="mb-3">{$t('help.faq5_a1')}</p>
						<ol class="list-decimal pl-6 space-y-2">
							<li>{$t('help.faq5_step1')}</li>
							<li>{$t('help.faq5_step2')}</li>
							<li>{$t('help.faq5_step3')}</li>
							<li>{$t('help.faq5_step4')}</li>
							<li>{$t('help.faq5_step5')}</li>
						</ol>
					</div>
				</div>
			</div>

			<!-- FAQ Item 6 -->
			<div class="bg-white border rounded-lg overflow-hidden">
				<button
					class="w-full text-left p-6 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center cursor-pointer"
					onclick={() => toggleFAQ(5)}
				>
					{$t('help.faq6_q')}
					<svg
						class="w-5 h-5 transform transition-transform duration-200 {openFAQ === 5
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				<div
					class="px-6 {openFAQ === 5
						? 'pb-6'
						: ''} transition-all duration-300 ease-in-out {openFAQ === 5
						? 'max-h-96 opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'}"
				>
					<div class="text-gray-600">
						<p class="mb-3">{$t('help.faq6_a1')}</p>
						<ul class="list-disc pl-6 space-y-2">
							<li>{$t('help.faq6_sol1')}</li>
							<li>{$t('help.faq6_sol2')}</li>
							<li>{$t('help.faq6_sol3')}</li>
							<li>{$t('help.faq6_sol4')}</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- FAQ Item 7 -->
			<div class="bg-white border rounded-lg overflow-hidden">
				<button
					class="w-full text-left p-6 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center cursor-pointer"
					onclick={() => toggleFAQ(6)}
				>
					{$t('help.faq7_q')}
					<svg
						class="w-5 h-5 transform transition-transform duration-200 {openFAQ === 6
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				<div
					class="px-6 {openFAQ === 6
						? 'pb-6'
						: ''} transition-all duration-300 ease-in-out {openFAQ === 6
						? 'max-h-96 opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'}"
				>
					<div class="text-gray-600">
						<p class="mb-3">{$t('help.faq7_a1')}</p>
						<ul class="list-disc pl-6 space-y-1">
							<li>Facebook</li>
							<li>Twitter/X</li>
							<li>Instagram {$t('help.faq7_captions')}</li>
							<li>WhatsApp</li>
							<li>Telegram</li>
							<li>{$t('help.faq7_email')}</li>
						</ul>
						<p class="mt-3">{$t('help.faq7_a2')}</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Best Practices -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold mb-8">
			{$t('help.bp_title')}
		</h2>
		<div class="bg-green-50 rounded-2xl p-8">
			<div class="space-y-6">
				<div class="flex items-start space-x-4">
					<div
						class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0"
					>
						<span class="text-sm">✓</span>
					</div>
					<div>
						<h3 class="font-semibold mb-1">
							{$t('help.bp1_title')}
						</h3>
						<p class="text-gray-600">
							{$t('help.bp1_desc')}
						</p>
					</div>
				</div>
				<div class="flex items-start space-x-4">
					<div
						class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0"
					>
						<span class="text-sm">✓</span>
					</div>
					<div>
						<h3 class="font-semibold mb-1">
							{$t('help.bp2_title')}
						</h3>
						<p class="text-gray-600">
							{$t('help.bp2_desc')}
						</p>
					</div>
				</div>
				<div class="flex items-start space-x-4">
					<div
						class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0"
					>
						<span class="text-sm">✓</span>
					</div>
					<div>
						<h3 class="font-semibold mb-1">
							{$t('help.bp3_title')}
						</h3>
						<p class="text-gray-600">
							{$t('help.bp3_desc')}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Support -->
	<section class="text-center bg-gray-50 rounded-2xl p-8">
		<h2 class="text-2xl font-bold mb-4">
			{$t('help.need_help_title')}
		</h2>
		<p class="text-gray-600 mb-6">
			{$t('help.need_help_desc')}
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a
				href="https://github.com/nathan-mittelette/boldify/issues"
				class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				target="_blank"
				rel="noopener noreferrer"
			>
				{$t('help.report_issue')}
			</a>
			<a
				href="mailto:mittelette.nathan@gmail.com"
				class="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
			>
				{$t('help.contact_support')}
			</a>
		</div>
	</section>
</div>
