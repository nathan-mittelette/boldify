<script lang="ts">
	import { t } from 'svelte-i18n';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { buildHreflang } from '$lib/utils/hreflang';
	import editorImg from '$lib/assets/how-it-works-editor.jpg?enhanced';

	const languages = buildHreflang('/how-it-works');
	const canonicalUrl = $derived(`https://boldify.net/${page.params.lang}/how-it-works`);
</script>

<SEOHead
	title={$t('how_it_works.title')}
	description={$t('how_it_works.description')}
	keywords={$t('how_it_works.keywords')}
	{canonicalUrl}
	{languages}
/>

<main class="dot-pattern min-h-screen">
	<!-- Hero Section -->
	<section
		class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto text-center relative overflow-hidden"
	>
		<div
			class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full mb-6 text-sm font-semibold"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="size-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
				/>
			</svg>
			{$t('how_it_works.badge_label')}
		</div>
		<h1
			class="text-[36px] md:text-[60px] leading-[44px] md:leading-[72px] tracking-tight font-extrabold text-neutral-900 max-w-4xl mx-auto mb-6"
		>
			{$t('how_it_works.hero_title_new')}
		</h1>
		<p class="text-lg text-neutral-500 max-w-2xl mx-auto">
			{$t('how_it_works.hero_desc_new')}
		</p>
	</section>

	<!-- 3-Step Guide -->
	<section class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Step 1 -->
			<div
				class="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-neutral-200/30 shadow-sm hover:shadow-md transition-shadow"
			>
				<div
					class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-6 shadow-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-neutral-900 mb-4">
					{$t('how_it_works.step1_title_new')}
				</h3>
				<p class="text-neutral-500 text-base">{$t('how_it_works.step1_desc_new')}</p>
			</div>

			<!-- Step 2 -->
			<div
				class="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-neutral-200/30 shadow-sm hover:shadow-md transition-shadow"
			>
				<div
					class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-6 shadow-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-neutral-900 mb-4">
					{$t('how_it_works.step2_title_new')}
				</h3>
				<p class="text-neutral-500 text-base">{$t('how_it_works.step2_desc_new')}</p>
			</div>

			<!-- Step 3 -->
			<div
				class="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-neutral-200/30 shadow-sm hover:shadow-md transition-shadow"
			>
				<div
					class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-6 shadow-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-neutral-900 mb-4">
					{$t('how_it_works.step3_title_new')}
				</h3>
				<p class="text-neutral-500 text-base">{$t('how_it_works.step3_desc_new')}</p>
			</div>
		</div>
	</section>

	<!-- Editor Preview -->
	<section class="py-10 md:py-16 px-4 md:px-6 bg-neutral-50/50">
		<div class="max-w-[1200px] mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
				<div class="relative group">
					<div
						class="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-all"
					></div>
					<enhanced:img
						src={editorImg}
						alt={$t('how_it_works.editor_title')}
						class="rounded-xl shadow-2xl relative z-10 border border-neutral-200/30 w-full"
					/>
				</div>
				<div class="space-y-6">
					<h2 class="text-[30px] leading-[38px] font-bold text-neutral-900">
						{$t('how_it_works.editor_title')}
					</h2>
					<ul class="space-y-6">
						<li class="flex items-start gap-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-5 text-primary mt-1 shrink-0"
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
							<div>
								<p class="font-semibold text-neutral-900">
									{$t('how_it_works.editor_feature1_title')}
								</p>
								<p class="text-neutral-500 text-base">{$t('how_it_works.editor_feature1_desc')}</p>
							</div>
						</li>
						<li class="flex items-start gap-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-5 text-primary mt-1 shrink-0"
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
							<div>
								<p class="font-semibold text-neutral-900">
									{$t('how_it_works.editor_feature2_title')}
								</p>
								<p class="text-neutral-500 text-base">{$t('how_it_works.editor_feature2_desc')}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- MCP Section -->
	<section class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto">
		<div class="bg-neutral-900 rounded-3xl p-8 md:p-16 relative overflow-hidden">
			<div class="absolute top-0 right-0 p-8 opacity-5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-40 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="0.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
					/>
				</svg>
			</div>
			<div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<div
						class="inline-flex items-center gap-2 px-3 py-1.5 bg-mcp/20 text-mcp border border-mcp/30 rounded-full mb-6 text-xs font-bold uppercase tracking-wider"
					>
						{$t('how_it_works.mcp_badge')}
					</div>
					<h2 class="text-[30px] leading-[38px] font-bold text-white mb-6">
						{$t('how_it_works.mcp_title')}
					</h2>
					<p class="text-lg text-white/80 mb-8">{$t('how_it_works.mcp_desc')}</p>
					<div class="space-y-4">
						<div class="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-5 text-mcp shrink-0 mt-0.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
								/>
							</svg>
							<p class="text-white/90 text-base">
								<span class="font-bold text-white">{$t('how_it_works.mcp_feature1_title')} :</span>
								{$t('how_it_works.mcp_feature1_desc')}
							</p>
						</div>
						<div class="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-5 text-mcp shrink-0 mt-0.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>
							<p class="text-white/90 text-base">
								<span class="font-bold text-white">{$t('how_it_works.mcp_feature2_title')} :</span>
								{$t('how_it_works.mcp_feature2_desc')}
							</p>
						</div>
					</div>
				</div>
				<div class="bg-white rounded-2xl p-6 shadow-2xl">
					<div class="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
						<div class="flex gap-1.5">
							<div class="w-3 h-3 rounded-full bg-red-500/50"></div>
							<div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
							<div class="w-3 h-3 rounded-full bg-green-500/50"></div>
						</div>
						<span class="text-neutral-400 text-xs font-mono">claude_desktop_config.json</span>
					</div>
					<pre class="font-mono text-sm text-neutral-500 leading-relaxed overflow-x-auto"><span
							class="text-neutral-400">&#123;</span
						>
  <span class="text-pink-500">"mcpServers"</span><span class="text-neutral-400">: &#123;</span>
    <span class="text-pink-500">"boldify"</span><span class="text-neutral-400">: &#123;</span>
      <span class="text-pink-500">"url"</span><span class="text-neutral-400">:</span> <span
							class="text-yellow-600">"https://api.boldify.net/mcp"</span
						>
    <span class="text-neutral-400">&#125;</span>
  <span class="text-neutral-400">&#125;</span>
<span class="text-neutral-400">&#125;</span></pre>
					<div class="mt-6 pt-4 border-t border-neutral-100 text-center">
						<a
							href={resolve(`/${page.params.lang}/mcp`)}
							class="inline-flex items-center gap-2 bg-mcp text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
						>
							{$t('how_it_works.mcp_cta')}
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto text-center">
		<h2 class="text-[30px] leading-[38px] font-bold text-neutral-900 mb-4">
			{$t('how_it_works.final_cta_title')}
		</h2>
		<p class="text-base text-neutral-500 mb-10 max-w-xl mx-auto">
			{$t('how_it_works.final_cta_desc')}
		</p>
		<div class="flex flex-col sm:flex-row justify-center gap-4">
			<a
				href={resolve(`/${page.params.lang}#text-editor`)}
				class="bg-primary text-white px-10 py-4 rounded-xl text-sm font-semibold shadow-lg hover:bg-primary-dark transition-colors"
			>
				{$t('how_it_works.final_cta_start')}
			</a>
			<a
				href={resolve(`/${page.params.lang}/mcp`)}
				class="bg-white border border-neutral-200 text-neutral-900 px-10 py-4 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
			>
				{$t('how_it_works.final_cta_mcp')}
			</a>
		</div>
	</section>
</main>
