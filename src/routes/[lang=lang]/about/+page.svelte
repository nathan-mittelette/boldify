<script lang="ts">
	import { t } from 'svelte-i18n';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { buildHreflang } from '$lib/utils/hreflang';
	import workspaceImg from '$lib/assets/about-workspace.jpg?enhanced';
	import teamImg from '$lib/assets/about-team.jpg?enhanced';

	const languages = buildHreflang('/about');
	const canonicalUrl = $derived(`https://boldify.net/${page.params.lang}/about`);
</script>

<SEOHead
	title={$t('about.title')}
	description={$t('about.description')}
	keywords={$t('about.keywords')}
	{canonicalUrl}
	{languages}
/>

<main class="dot-pattern min-h-screen">
	<!-- Hero Section -->
	<section class="relative py-10 md:py-16 px-4 md:px-6 overflow-hidden">
		<div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
			<div class="md:col-span-7 space-y-4">
				<span
					class="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold"
				>
					{$t('about.mission_badge')}
				</span>
				<h1
					class="text-[36px] md:text-[60px] leading-[44px] md:leading-[72px] tracking-tight font-extrabold text-neutral-900"
				>
					{$t('about.hero_tagline')}
				</h1>
				<p class="text-lg text-neutral-500 max-w-xl">
					{$t('about.hero_desc_new')}
				</p>
			</div>
			<div class="md:col-span-5 relative">
				<div
					class="bg-neutral-100 rounded-xl p-4 shadow-xl border border-neutral-200/30 md:rotate-3"
				>
					<enhanced:img
						src={workspaceImg}
						alt={$t('about.hero_title')}
						class="rounded-lg w-full h-auto"
					/>
					<div
						class="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border border-neutral-200/20 max-w-[200px]"
					>
						<p class="text-sm font-semibold text-primary">{$t('about.hero_simple_tagline')}</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Bento "Pourquoi Boldify" -->
	<section class="py-10 md:py-16 px-4 md:px-6 bg-neutral-50/50">
		<div class="max-w-[1200px] mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-[30px] leading-[38px] font-bold text-neutral-900 mb-4">
					{$t('about.story_title')}
				</h2>
				<p class="text-base text-neutral-500 max-w-2xl mx-auto">
					{$t('about.story_subtitle')}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<!-- Problem card - spans 2 cols -->
				<div
					class="md:col-span-2 bg-white p-8 rounded-2xl border border-neutral-200/30 shadow-sm flex flex-col justify-between"
				>
					<div>
						<div
							class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6"
						>
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
									d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>
						</div>
						<h3 class="text-xl font-bold text-neutral-900 mb-4">{$t('about.problem_title')}</h3>
						<p class="text-neutral-500 text-base">{$t('about.problem_desc')}</p>
					</div>
					<div class="mt-8 pt-6 border-t border-neutral-100 flex gap-4 flex-wrap">
						<div class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-5 text-primary"
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
							<span class="text-sm font-semibold">{$t('about.problem_tag1')}</span>
						</div>
						<div class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-5 text-primary"
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
							<span class="text-sm font-semibold">{$t('about.problem_tag2')}</span>
						</div>
					</div>
				</div>

				<!-- Speed card -->
				<div
					class="bg-primary text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center text-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-12 mx-auto mb-6 opacity-90"
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
					<h3 class="text-xl font-bold mb-4">{$t('about.speed_title')}</h3>
					<p class="text-base opacity-90">{$t('about.speed_desc')}</p>
				</div>

				<!-- Free card -->
				<div class="bg-accent/20 p-8 rounded-2xl border border-accent/30 shadow-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-10 text-neutral-700 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
						/>
					</svg>
					<h3 class="text-xl font-bold text-neutral-900 mb-4">{$t('about.free_title')}</h3>
					<p class="text-base text-neutral-700 opacity-80">{$t('about.free_desc')}</p>
				</div>

				<!-- Preview card - spans 2 cols -->
				<div
					class="md:col-span-2 bg-white p-8 rounded-2xl border border-neutral-200/30 shadow-sm overflow-hidden"
				>
					<div class="flex flex-col md:flex-row gap-8 items-center">
						<div class="flex-1">
							<h3 class="text-xl font-bold text-neutral-900 mb-4">{$t('about.preview_title')}</h3>
							<p class="text-neutral-500 text-base">{$t('about.preview_desc')}</p>
						</div>
						<div class="flex-1 w-full">
							<div class="bg-neutral-50 p-4 rounded-lg border border-neutral-200/30">
								<div class="flex items-center gap-2 mb-3">
									<div class="w-8 h-8 rounded-full bg-neutral-200"></div>
									<div class="h-2 w-24 bg-neutral-200/70 rounded"></div>
								</div>
								<div class="space-y-2">
									<div class="h-2 w-full bg-primary/20 rounded"></div>
									<div class="h-2 w-3/4 bg-primary/20 rounded font-bold"></div>
									<div class="h-2 w-1/2 bg-primary/20 rounded"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Ethics / Values -->
	<section class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
			<div class="order-2 md:order-1">
				<enhanced:img
					src={teamImg}
					alt={$t('about.ethics_title')}
					class="rounded-xl shadow-2xl w-full"
				/>
			</div>
			<div class="order-1 md:order-2 space-y-6">
				<h2 class="text-[30px] leading-[38px] font-bold text-neutral-900">
					{$t('about.ethics_title')}
				</h2>
				<div class="space-y-6">
					<div class="flex gap-4">
						<div
							class="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-6"
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
						<div>
							<h4 class="font-bold text-neutral-900">{$t('about.transparency_title')}</h4>
							<p class="text-neutral-500 text-base">{$t('about.transparency_desc')}</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div
							class="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-bold text-neutral-900">{$t('about.community_title')}</h4>
							<p class="text-neutral-500 text-base">{$t('about.community_desc')}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-10 md:py-16 px-4 md:px-6 max-w-[1200px] mx-auto">
		<div
			class="bg-neutral-900 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
		>
			<div
				class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"
			></div>
			<h2 class="text-[30px] leading-[38px] font-bold mb-6 relative z-10">
				{$t('about.cta_title')}
			</h2>
			<p class="text-lg opacity-80 mb-8 max-w-xl mx-auto relative z-10">
				{$t('about.cta_subtitle')}
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
				<a
					href={resolve(`/${page.params.lang}#text-editor`)}
					class="bg-primary text-white px-8 py-4 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
				>
					{$t('about.cta_try')}
				</a>
				<a
					href={resolve(`/${page.params.lang}/how-it-works`)}
					class="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors"
				>
					{$t('about.cta_demo')}
				</a>
			</div>
		</div>
	</section>
</main>
