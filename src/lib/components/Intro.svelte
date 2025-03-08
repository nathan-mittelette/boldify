<script lang="ts">
	import { t } from 'svelte-i18n';
	import TextPreview from '$lib/components/TextPreview.svelte';

	let scrollY = 0;

	const name = 'John Doe';
	const degree = '3e et +';
	const position = 'Developer at @Boldify';
	const timePosted = '4 h';
</script>

<svelte:window bind:scrollY />

<section id="introduction">
	<div class="container mx-auto px-4 lg:px-8 min-h-[80vh] flex flex-col justify-center">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
			<div class="lg:col-span-7 text-center lg:text-left animate-slide-up">
				<div class="relative mb-6">
					<span
						class="absolute -left-2 -top-2 bg-accent/20 rounded-full w-16 h-16 blur-xl animate-pulse hidden lg:block"
					></span>
					<p
						class="inline-block text-sm font-semibold py-1 px-4 rounded-full bg-primary/10 text-primary border border-primary/30 mb-4"
					>
						<span class="flex items-center">
							<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								></path>
							</svg>
							{$t('introduction.beta')}
						</span>
					</p>
				</div>
				<h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
					<span class="gradient-text">{$t('introduction.title')}</span>
				</h1>
				<p class="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto lg:mx-0">
					{$t('introduction.description')}
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
					<a href="#text-editor" class="btn btn-primary">
						{$t('introduction.try_button')}
						<svg
							class="w-5 h-5 ml-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							></path>
						</svg>
					</a>
					<a
						href="https://github.com/nathan-mittelette/boldify"
						target="_blank"
						rel="noopener"
						class="btn btn-outline"
					>
						{$t('introduction.learn_more')}
					</a>
				</div>
			</div>
			<div class="lg:col-span-5 animate-fade-in" style="transition-delay: 300ms;">
				<div class="relative rotate-1">
					<div
						class="absolute -top-6 -right-6 bg-primary/20 rounded-full w-32 h-32 blur-xl animate-pulse hidden lg:block"
					></div>
					<TextPreview text={$t('introduction.preview')} {name} {degree} {position} {timePosted} />
				</div>
			</div>
		</div>
		<div class="absolute left-0 right-0 bottom-8 flex justify-center animate-bounce z-10">
			<a href="#text-editor" class="text-neutral-400 hover:text-primary" aria-label="Scroll down">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</a>
		</div>
	</div>
</section>
