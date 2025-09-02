<script lang="ts">
	import { _, t } from 'svelte-i18n';
	import { locale, SUPPORTED_LANGUAGES } from '$lib/services/i18n.service';
	import { page } from '$app/state';
	import type { SupportedLanguages } from '../../params/lang';

	const FLAGS: Record<SupportedLanguages, string> = {
		fr: '🇫🇷',
		en: '🇬🇧'
	};

	const currentYear = new Date().getFullYear();

	const languageUrls = $derived(
		SUPPORTED_LANGUAGES.reduce(
			(acc, lang) => {
				const params = page.params;

				if ('lang' in params) {
					const currentPath = page.url.pathname;
					const segments = currentPath.split('/');
					// segments[0] is always '', segments[1] is the locale
					if (SUPPORTED_LANGUAGES.includes(segments[1] as SupportedLanguages)) {
						segments[1] = lang;
					}
					acc[lang] = segments.join('/');
				} else {
					acc[lang] = `/${lang}`;
				}
				return acc;
			},
			{} as Record<SupportedLanguages, string>
		)
	);
</script>

<footer class="bg-neutral-900 text-white pt-16 pb-8">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
			<div>
				<div class="flex items-center mb-6">
					<h3 class="text-2xl font-bold">Boldify</h3>
				</div>
				<p class="text-neutral-400 mb-4">
					{$t('footer.description')}
					<a
						href="https://www.linkedin.com/in/nathan-mittelette/"
						target="_blank"
						rel="noopener"
						class="text-blue-400 hover:text-blue-300 transition-colors">Nathan Mittelette</a
					>.
				</p>
				<div class="flex items-center space-x-4">
					{#each SUPPORTED_LANGUAGES as lang (lang)}
						<a
							href={languageUrls[lang]}
							class="flex items-center justify-center w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors duration-300 hover:cursor-pointer"
							aria-label="{$_('footer.changeLanguage')} {lang}"
							hreflang={lang}
						>
							<span class="text-lg">{FLAGS[lang] ?? lang}</span>
						</a>
					{/each}
				</div>
			</div>

			<div>
				<h4 class="text-lg font-semibold mb-6">{$t('footer.navigation')}</h4>
				<ul class="space-y-3">
					<li>
						<a
							href="/{$locale}"
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('nav.home')}
						</a>
					</li>
					<li>
						<a
							href="/{$locale}/about"
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('nav.about')}
						</a>
					</li>
					<li>
						<a
							href="/{$locale}/how-it-works"
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('nav.how_it_works')}
						</a>
					</li>
					<li>
						<a
							href="/{$locale}/help"
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('nav.help')}
						</a>
					</li>
				</ul>
			</div>

			<div>
				<h4 class="text-lg font-semibold mb-6">{$t('footer.resources')}</h4>
				<ul class="space-y-3">
					<li>
						<a
							href="https://github.com/nathan-mittelette/boldify"
							target="_blank"
							rel="noopener"
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('footer.github')}
						</a>
					</li>
					<li>
						<a
							href="https://github.com/nathan-mittelette/boldify/issues"
							target="_blank"
							rel="noopener"
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('footer.report_issue')}
						</a>
					</li>
				</ul>
			</div>

			<div>
				<h4 class="text-lg font-semibold mb-6">{$t('footer.support')}</h4>
				<a
					href="https://www.buymeacoffee.com/boldify"
					target="_blank"
					rel="noopener"
					class="btn btn-accent inline-flex items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2"
					>
						<path d="M18 8h1a4 4 0 0 1 0 8h-1" />
						<path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
						<line x1="6" y1="1" x2="6" y2="4" />
						<line x1="10" y1="1" x2="10" y2="4" />
						<line x1="14" y1="1" x2="14" y2="4" />
					</svg>
					{$t('footer.buy_coffee')}
				</a>
			</div>
		</div>

		<div
			class="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center"
		>
			<p class="text-sm text-neutral-400 mb-4 md:mb-0">
				© {currentYear} Boldify. {$t('footer.rights')}
			</p>
			<p class="text-xs text-neutral-500 max-w-md text-center md:text-right">
				{$t('footer.clarityMessage')}
			</p>
		</div>
	</div>
</footer>
