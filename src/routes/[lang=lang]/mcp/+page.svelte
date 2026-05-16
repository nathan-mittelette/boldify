<script lang="ts">
	import { t } from 'svelte-i18n';
	import { page } from '$app/state';
	import { buildHreflang } from '$lib/utils/hreflang';
	import SEOHead from '$lib/components/SEOHead.svelte';

	const languages = buildHreflang('/mcp');
	const canonicalUrl = $derived(`https://boldify.net/${page.params.lang}/mcp`);

	const installCommand =
		'curl -fsSL https://raw.githubusercontent.com/nathan-mittelette/boldify-mcp/main/scripts/install.sh | bash';

	let copied = $state(false);

	async function copyInstallCommand() {
		await navigator.clipboard.writeText(installCommand);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<SEOHead
	title={$t('mcp.title')}
	description={$t('mcp.description')}
	keywords={$t('mcp.keywords')}
	{canonicalUrl}
	{languages}
/>

<main class="dot-pattern min-h-screen">
	<!-- Hero Section -->
	<section class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto text-center">
		<div class="inline-flex items-center gap-2 px-4 py-2 bg-mcp/10 text-mcp rounded-full mb-8">
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
					d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			<span class="text-sm font-semibold tracking-wide">{$t('mcp.badge_label')}</span>
		</div>

		<h1
			class="text-[36px] md:text-[60px] leading-[44px] md:leading-[72px] tracking-tight font-extrabold text-neutral-900 max-w-4xl mx-auto mb-6"
		>
			{$t('mcp.hero_title')}
		</h1>

		<p class="text-lg text-neutral-500 max-w-2xl mx-auto mb-10">
			{$t('mcp.hero_description')}
		</p>

		<div class="flex flex-col md:flex-row justify-center gap-4">
			<a
				href="https://github.com/nathan-mittelette/boldify-mcp"
				target="_blank"
				rel="noopener"
				class="bg-mcp text-white px-8 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
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
						d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
					/>
				</svg>
				{$t('mcp.github_cta')}
			</a>
			<a
				href="#examples"
				class="bg-white border border-neutral-200 px-8 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-50 transition-all"
			>
				{$t('mcp.discover_cta')}
			</a>
		</div>
	</section>

	<!-- Why MCP section -->
	<section class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-[30px] leading-[38px] font-bold text-neutral-900 mb-4">
				{$t('mcp.why_title')}
			</h2>
			<div class="w-20 h-1.5 bg-mcp mx-auto rounded-full"></div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div
				class="bg-white p-8 rounded-2xl border border-neutral-200/30 shadow-sm hover:shadow-md transition-shadow"
			>
				<div class="w-12 h-12 bg-mcp/10 text-mcp rounded-xl flex items-center justify-center mb-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-7"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-bold mb-3">{$t('mcp.automation_title')}</h3>
				<p class="text-neutral-500 text-base">{$t('mcp.automation_desc')}</p>
			</div>

			<div
				class="bg-white p-8 rounded-2xl border border-neutral-200/30 shadow-sm hover:shadow-md transition-shadow"
			>
				<div class="w-12 h-12 bg-mcp/10 text-mcp rounded-xl flex items-center justify-center mb-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-7"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-bold mb-3">{$t('mcp.consistency_title')}</h3>
				<p class="text-neutral-500 text-base">{$t('mcp.consistency_desc')}</p>
			</div>

			<div
				class="bg-white p-8 rounded-2xl border border-neutral-200/30 shadow-sm hover:shadow-md transition-shadow"
			>
				<div class="w-12 h-12 bg-mcp/10 text-mcp rounded-xl flex items-center justify-center mb-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-7"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-bold mb-3">{$t('mcp.time_saving_title')}</h3>
				<p class="text-neutral-500 text-base">{$t('mcp.time_saving_desc')}</p>
			</div>
		</div>
	</section>

	<!-- Integration examples -->
	<section class="py-10 md:py-16 px-4 md:px-6 bg-neutral-50/50" id="examples">
		<div class="max-w-[1200px] mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-[30px] leading-[38px] font-bold text-neutral-900 mb-4">
					{$t('mcp.integration_title')}
				</h2>
				<div class="w-20 h-1.5 bg-mcp mx-auto rounded-full"></div>
			</div>

			<!-- Sub-section 1: HTTP / no download -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
				<div>
					<div
						class="inline-flex items-center gap-2 px-3 py-1.5 bg-mcp/10 text-mcp rounded-full mb-6 text-xs font-bold uppercase tracking-wider"
					>
						{$t('mcp.http_badge')}
					</div>
					<h3 class="text-[24px] leading-[32px] font-bold text-neutral-900 mb-4">
						{$t('mcp.http_title')}
					</h3>
					<p class="text-lg text-neutral-500 mb-8">
						{$t('mcp.http_desc')}
					</p>
					<ul class="space-y-4">
						{#each [$t('mcp.http_item1'), $t('mcp.http_item2'), $t('mcp.http_item3')] as item (item)}
							<li class="flex items-start gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-5 text-mcp mt-0.5 shrink-0"
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
								<span class="text-base">{item}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div>
					<!-- Claude Desktop config -->
					<div class="bg-neutral-900 rounded-2xl p-6 shadow-2xl">
						<div class="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
							<div class="flex gap-1.5">
								<div class="w-3 h-3 rounded-full bg-red-500/50"></div>
								<div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
								<div class="w-3 h-3 rounded-full bg-green-500/50"></div>
							</div>
							<span class="text-white/40 text-xs ml-4 font-mono">claude_desktop_config.json</span>
						</div>
						<pre class="font-mono text-sm text-blue-200 overflow-x-auto"><span class="text-white/60"
								>&#123;</span
							>
  <span class="text-pink-400">"mcpServers"</span><span class="text-white/60">: &#123;</span>
    <span class="text-pink-400">"boldify"</span><span class="text-white/60">: &#123;</span>
      <span class="text-pink-400">"url"</span><span class="text-white/60">:</span> <span
								class="text-yellow-200">"https://api.boldify.net/mcp"</span
							>
    <span class="text-white/60">&#125;</span>
  <span class="text-white/60">&#125;</span>
<span class="text-white/60">&#125;</span></pre>
						<div class="mt-6 pt-4 border-t border-white/10">
							<span class="text-white/60 text-xs italic">{$t('mcp.config_comment')}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Divider -->
			<div class="flex items-center gap-6 mb-20">
				<div class="flex-1 h-px bg-neutral-200"></div>
				<span class="text-neutral-400 text-sm font-medium uppercase tracking-widest"
					>{$t('mcp.or_separator')}</span
				>
				<div class="flex-1 h-px bg-neutral-200"></div>
			</div>

			<!-- Sub-section 2: Local CLI -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<div class="order-2 lg:order-1">
					<!-- Install command -->
					<div class="bg-neutral-900 rounded-2xl p-6 shadow-2xl">
						<div class="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
							<div class="flex items-center gap-2">
								<div class="flex gap-1.5">
									<div class="w-3 h-3 rounded-full bg-red-500/50"></div>
									<div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
									<div class="w-3 h-3 rounded-full bg-green-500/50"></div>
								</div>
								<span class="text-white/40 text-xs ml-4 font-mono">terminal</span>
							</div>
							<button
								onclick={copyInstallCommand}
								class="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors text-xs cursor-pointer"
								aria-label="Copy install command"
							>
								{#if copied}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-4 text-green-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
									</svg>
									<span class="text-green-400">Copied!</span>
								{:else}
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
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
								{/if}
							</button>
						</div>
						<pre class="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all"><span
								class="text-green-400">$</span
							> <span class="text-white">{installCommand}</span></pre>
						<div class="mt-4 pt-4 border-t border-white/10">
							<span class="text-white/60 text-xs italic">{$t('mcp.install_command_comment')}</span>
						</div>
					</div>
				</div>

				<div class="order-1 lg:order-2">
					<div
						class="inline-flex items-center gap-2 px-3 py-1.5 bg-mcp/10 text-mcp rounded-full mb-6 text-xs font-bold uppercase tracking-wider"
					>
						{$t('mcp.local_badge')}
					</div>
					<h3 class="text-[24px] leading-[32px] font-bold text-neutral-900 mb-4">
						{$t('mcp.local_title')}
					</h3>
					<p class="text-lg text-neutral-500 mb-8">
						{$t('mcp.local_desc')}
					</p>
					<ul class="space-y-4">
						{#each [$t('mcp.local_item1'), $t('mcp.local_item2'), $t('mcp.local_item3')] as item (item)}
							<li class="flex items-start gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-5 text-mcp mt-0.5 shrink-0"
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
								<span class="text-base">{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto">
		<div class="bg-mcp rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
			<div class="absolute top-0 left-0 w-full h-full opacity-10 dot-pattern-white"></div>
			<h2 class="text-[30px] leading-[38px] font-bold mb-6 relative z-10">
				{$t('mcp.cta_title')}
			</h2>
			<p class="text-lg mb-10 opacity-90 max-w-xl mx-auto relative z-10">
				{$t('mcp.cta_desc')}
			</p>
			<div class="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
				<a
					href="https://github.com/nathan-mittelette/boldify-mcp"
					target="_blank"
					rel="noopener"
					class="bg-white text-mcp px-8 py-4 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
				>
					{$t('mcp.install_cta')}
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
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
						/>
					</svg>
				</a>
				<a
					href="https://github.com/nathan-mittelette/boldify-mcp#readme"
					target="_blank"
					rel="noopener"
					class="border border-white/30 text-white px-8 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
				>
					{$t('mcp.docs_cta')}
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
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
						/>
					</svg>
				</a>
			</div>
		</div>
	</section>
</main>
