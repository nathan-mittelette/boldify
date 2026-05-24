<script lang="ts">
	import { t } from 'svelte-i18n';
	import TextPreview from '$lib/components/TextPreview.svelte';

	const name = 'John Doe';
	const degree = '3e et +';
	const position = 'Developer at @Boldify';
	const timePosted = '4 h';
</script>

<section id="features" class="py-10 lg:py-16 bg-neutral-50/70">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
			<div class="lg:col-span-7 text-center lg:text-left animate-slide-up">
				<h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">
					<span class="gradient-text">{$t('introduction.title')}</span>
				</h2>
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
						class="absolute z-0 -top-6 -right-6 bg-primary/20 rounded-full w-32 h-32 blur-xl animate-pulse hidden lg:block"
					></div>
					<TextPreview
						text={$t('introduction.preview')}
						{name}
						{degree}
						{position}
						{timePosted}
						smallButtons={true}
					/>
				</div>
			</div>
		</div>
	</div>
</section>
