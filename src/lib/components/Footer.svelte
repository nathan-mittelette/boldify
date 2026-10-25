<script lang="ts">
	import {
		platforms,
		platformUrl,
		sectionFromPath,
		type Platform
	} from '#lib/models/platform.model.js';
	let { platform = 'linkedin' }: { platform?: Platform } = $props();
	const languages = SUPPORTED_LANGUAGES;
	import { _ } from 'svelte-i18n';
	import { platformTranslations } from '#lib/services/platform-i18n.service.js';
	const t = platformTranslations();
	import { locale, SUPPORTED_LANGUAGES } from '#lib/services/i18n.service.js';
	import { page } from '$app/state';
	import type { SupportedLanguages } from '../../params/lang';
	import { resolve } from '$app/paths';
	import { trackBuyMeACoffeeClicked, trackLanguageChanged } from '#lib/services/clarity.service.js';

	const FLAGS: Record<SupportedLanguages, string> = {
		fr: '🇫🇷',
		en: '🇬🇧',
		es: '🇪🇸',
		pt: '🇧🇷',
		de: '🇩🇪',
		tr: '🇹🇷',
		pl: '🇵🇱'
	};

	const currentYear = new Date().getFullYear();

	function trackFooterLanguageClick(nextLanguage: SupportedLanguages) {
		if ($locale === nextLanguage) return;

		trackLanguageChanged($locale, nextLanguage);
	}

	const languageUrls = $derived(
		languages.reduce(
			(acc, lang) => {
				const params = page.params;

				if (platform === 'x') {
					acc[lang] = platformUrl('x', lang, sectionFromPath(page.url.pathname));
				} else if ('lang' in params) {
					const currentPath = page.url.pathname;
					const segments = currentPath.split('/');
					// segments[0] is always '', segments[1] is the locale
					if (SUPPORTED_LANGUAGES.includes(segments[1] as SupportedLanguages)) {
						segments[1] = lang;
					}
					acc[lang] = segments.join('/') as `/${string}`;
				} else {
					acc[lang] = `/${lang}`;
				}
				return acc;
			},
			{} as Record<SupportedLanguages, `/${string}`>
		)
	);
</script>

<footer class="bg-neutral-900 text-white pt-16 pb-8">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
			<div>
				<div class="flex items-center mb-6">
					<h3 class="text-2xl font-bold flex items-center gap-2">Boldify</h3>
				</div>
				<p class="text-neutral-400 mb-4">
					{$t('footer.description')}
					<a
						href="https://www.linkedin.com/in/nathan-mittelette/"
						target="_blank"
						rel="noopener"
						class="text-footer-link hover:text-white transition-colors">Nathan Mittelette</a
					>.
				</p>
				<div class="flex items-center gap-2 flex-wrap">
					{#each languages as lang (lang)}
						<a
							href={resolve(languageUrls[lang].slice(1))}
							class="flex items-center justify-center size-8 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors duration-300 hover:cursor-pointer shrink-0 overflow-hidden"
							aria-label="{$_('footer.changeLanguage')} {lang}"
							hreflang={lang}
							data-sveltekit-preload-data="false"
							onclick={() => trackFooterLanguageClick(lang)}
						>
							<span class="text-base leading-none">{FLAGS[lang] ?? lang}</span>
						</a>
					{/each}
				</div>
			</div>

			<div>
				<h4 class="text-lg font-semibold mb-6">{$t('footer.navigation')}</h4>
				<ul class="space-y-3">
					<li>
						<a
							class="text-neutral-300 hover:text-white underline"
							href={resolve(
								platforms[platform === 'x' ? 'linkedin' : 'x'].home($locale ?? 'fr').slice(1)
							)}>{platform === 'x' ? 'LinkedIn' : 'X (Twitter)'}</a
						>
					</li>
					<li>
						<a
							href={resolve(platforms[platform].home($locale ?? 'fr').slice(1))}
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('nav.home')}
						</a>
					</li>
					<li>
						<a
							href={resolve(platformUrl(platform, $locale ?? 'fr', 'mcp').slice(1))}
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('nav.mcp')}
						</a>
					</li>
					<li>
						<a
							href={resolve(platformUrl(platform, $locale ?? 'fr', 'about').slice(1))}
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('nav.about')}
						</a>
					</li>
					<li>
						<a
							href={resolve(platformUrl(platform, $locale ?? 'fr', 'how-it-works').slice(1))}
							class="text-neutral-400 hover:text-white transition-colors duration-300"
						>
							{$t('nav.how_it_works')}
						</a>
					</li>
					<li>
						<a
							href={resolve(platformUrl(platform, $locale ?? 'fr', 'help').slice(1))}
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
					href="https://buymeacoffee.com/boldify"
					target="_blank"
					rel="noopener"
					class="btn btn-accent inline-flex items-center"
					onclick={() => trackBuyMeACoffeeClicked('footer')}
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
