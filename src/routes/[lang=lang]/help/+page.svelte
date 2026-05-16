<script lang="ts">
	import { t } from 'svelte-i18n';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import TextPreview from '$lib/components/TextPreview.svelte';
	import { page } from '$app/state';
	import { buildHreflang } from '$lib/utils/hreflang';

	const languages = buildHreflang('/help');
	const canonicalUrl = $derived(`https://boldify.net/${page.params.lang}/help`);

	type Category = 'formatting' | 'linkedin' | 'mcp';
	let activeCategory = $state<Category>('formatting');

	const faqSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		name: 'FAQ - Boldify',
		url: page.url.href,
		mainEntity: [
			{
				'@type': 'Question',
				name: $t('help.formatting_q1'),
				acceptedAnswer: { '@type': 'Answer', text: $t('help.formatting_a1') }
			},
			{
				'@type': 'Question',
				name: $t('help.formatting_q2'),
				acceptedAnswer: { '@type': 'Answer', text: $t('help.formatting_a2') }
			},
			{
				'@type': 'Question',
				name: $t('help.linkedin_q1'),
				acceptedAnswer: { '@type': 'Answer', text: $t('help.linkedin_a1') }
			},
			{
				'@type': 'Question',
				name: $t('help.linkedin_q2'),
				acceptedAnswer: { '@type': 'Answer', text: $t('help.linkedin_a2') }
			},
			{
				'@type': 'Question',
				name: $t('help.mcp_q1'),
				acceptedAnswer: { '@type': 'Answer', text: $t('help.mcp_a1') }
			},
			{
				'@type': 'Question',
				name: $t('help.mcp_q2'),
				acceptedAnswer: { '@type': 'Answer', text: $t('help.mcp_a2') }
			}
		]
	});

	const categories: { id: Category; label: string }[] = [
		{ id: 'formatting', label: $t('help.cat_formatting') },
		{ id: 'linkedin', label: $t('help.cat_linkedin') },
		{ id: 'mcp', label: $t('help.cat_mcp') }
	];

	type FaqItem = { q: string; a: string; protip?: string };

	const faqByCategory: Record<Category, FaqItem[]> = $derived({
		formatting: [
			{ q: $t('help.formatting_q1'), a: $t('help.formatting_a1') },
			{ q: $t('help.formatting_q2'), a: $t('help.formatting_a2') }
		],
		linkedin: [
			{ q: $t('help.linkedin_q1'), a: $t('help.linkedin_a1') },
			{ q: $t('help.linkedin_q2'), a: $t('help.linkedin_a2') }
		],
		mcp: [
			{ q: $t('help.mcp_q1'), a: $t('help.mcp_a1'), protip: $t('help.mcp_protip') },
			{ q: $t('help.mcp_q2'), a: $t('help.mcp_a2') }
		]
	});

	let openIndex = $state<number | null>(null);

	function toggleFaq(i: number) {
		openIndex = openIndex === i ? null : i;
	}

	$effect(() => {
		if (activeCategory) openIndex = null;
	});
</script>

<JsonLd schema={faqSchema} />

<SEOHead
	title={$t('help.title')}
	description={$t('help.description')}
	keywords={$t('help.keywords')}
	{canonicalUrl}
	{languages}
/>

<main class="min-h-screen">
	<!-- Hero Search Section -->
	<section class="relative py-10 md:py-16 px-4 md:px-6 overflow-hidden dot-pattern">
		<div class="max-w-[1200px] mx-auto text-center">
			<h1
				class="text-[36px] md:text-[60px] leading-[44px] md:leading-[72px] tracking-tight font-extrabold text-neutral-900 mb-6"
			>
				{$t('help.hero_title_new')}
			</h1>
			<p class="text-lg text-neutral-500 max-w-2xl mx-auto mb-10">
				{$t('help.hero_desc_new')}
			</p>
		</div>
	</section>

	<!-- FAQ Categories & Content -->
	<section class="py-10 md:py-16 px-4 md:px-6 bg-neutral-50/50">
		<div class="max-w-[1200px] mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-12">
				<!-- Sidebar -->
				<aside class="hidden md:block md:col-span-3">
					<div class="sticky top-28 space-y-2">
						<p class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
							{$t('help.faq_title')}
						</p>
						{#each categories as cat (cat.id)}
							<button
								class="w-full text-left px-4 py-3 rounded-xl font-medium transition-all text-sm {activeCategory ===
								cat.id
									? 'bg-primary/10 text-primary font-bold'
									: 'text-neutral-600 hover:bg-neutral-100'}"
								onclick={() => (activeCategory = cat.id)}
							>
								{cat.label}
							</button>
						{/each}
					</div>
				</aside>

				<!-- Mobile category tabs -->
				<div class="md:hidden flex gap-2 overflow-x-auto pb-2 md:col-span-12">
					{#each categories as cat (cat.id)}
						<button
							class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all {activeCategory ===
							cat.id
								? 'bg-primary text-white'
								: 'bg-white border border-neutral-200 text-neutral-600'}"
							onclick={() => (activeCategory = cat.id)}
						>
							{cat.label}
						</button>
					{/each}
				</div>

				<!-- FAQ Accordion -->
				<div class="md:col-span-9 space-y-4">
					{#each faqByCategory[activeCategory] as item, i (i)}
						<div
							class="bg-white border border-neutral-200/30 rounded-2xl shadow-sm overflow-hidden"
						>
							<button
								class="w-full text-left p-6 font-semibold text-base hover:bg-neutral-50 transition-colors flex justify-between items-center gap-4 cursor-pointer"
								onclick={() => toggleFaq(i)}
							>
								<span>{item.q}</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-5 shrink-0 transition-transform duration-200 {openIndex === i
										? 'rotate-180'
										: ''}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							<div
								class="transition-all duration-300 ease-in-out {openIndex === i
									? 'max-h-96 opacity-100'
									: 'max-h-0 opacity-0 overflow-hidden'}"
							>
								<div class="px-6 pb-6 text-neutral-500 text-base space-y-4">
									<p>{item.a}</p>
									{#if item.protip}
										<div class="p-4 bg-neutral-50 rounded-lg border-l-4 border-mcp">
											<p class="text-sm text-neutral-600">{item.protip}</p>
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Preview Section -->
	<section class="py-10 md:py-16 px-4 md:px-6 bg-neutral-50/30">
		<div class="max-w-[1200px] mx-auto">
			<div class="flex flex-col lg:flex-row items-center gap-16">
				<div class="lg:w-1/2">
					<h2 class="text-[30px] leading-[38px] font-bold text-neutral-900 mb-6">
						{$t('help.preview_section_title')}
					</h2>
					<p class="text-lg text-neutral-500 mb-8">
						{$t('help.preview_section_desc')}
					</p>
					<ul class="space-y-4">
						{#each [$t('help.preview_check1'), $t('help.preview_check2'), $t('help.preview_check3')] as check (check)}
							<li class="flex items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-5 text-primary shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span class="text-base">{check}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- LinkedIn preview -->
				<div class="lg:w-1/2 w-full">
					<TextPreview
						text={$t('help.preview_sample_text')}
						name={$t('help.preview_sample_name')}
						degree={$t('help.preview_sample_degree')}
						position={$t('help.preview_sample_position')}
						timePosted={$t('help.preview_sample_time')}
						smallButtons={true}
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Support CTA -->
	<section class="py-10 md:py-16 px-4 md:px-6 bg-primary">
		<div
			class="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
		>
			<div class="text-center md:text-left">
				<h2 class="text-[30px] leading-[38px] font-bold text-white mb-2">
					{$t('help.support_title')}
				</h2>
				<p class="text-lg text-white/90">{$t('help.support_desc')}</p>
			</div>
			<div class="flex flex-col sm:flex-row gap-4">
				<a
					href="mailto:mittelette.nathan@gmail.com"
					class="bg-white text-primary px-8 py-4 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-all shadow-lg flex items-center justify-center gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
						/>
					</svg>
					{$t('help.support_contact')}
				</a>
				<a
					href="https://github.com/nathan-mittelette/boldify/issues"
					target="_blank"
					rel="noopener"
					class="bg-primary-dark border border-white/20 text-white px-8 py-4 rounded-xl text-sm font-semibold hover:bg-primary-dark/80 transition-all flex items-center justify-center gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					</svg>
					{$t('help.support_github')}
				</a>
			</div>
		</div>
	</section>
</main>
