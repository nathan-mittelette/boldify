<script lang="ts">
	import { locale } from '$lib/services/i18n.service';
	import { page } from '$app/stores';

	interface Props {
		title: string;
		description: string;
		keywords: string;
		canonicalUrl?: string;
		ogImage?: string;
		languages?: { lang: string; url: string }[];
	}

	const {
		title,
		description,
		keywords,
		canonicalUrl = 'https://boldify.net/',
		ogImage = 'https://boldify.net/favicon-96x96.png',
		languages = []
	}: Props = $props();

	const allLanguages = $derived.by(() => {
		const allLangs = [...languages];

		if ($locale) {
			const currentLangIndex = allLangs.findIndex((lang) => lang.lang === $locale);
			const currentUrl = `https://boldify.net${$page.url.pathname}`;

			if (currentLangIndex !== -1) {
				// Update existing current language URL to match current page
				allLangs[currentLangIndex].url = currentUrl;
			} else {
				// Add current language with current page URL
				allLangs.push({ lang: $locale, url: currentUrl });
			}
		}

		return allLangs;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:image" content={ogImage} />

	{#if allLanguages.length > 0}
		{#each allLanguages as { lang, url } (lang)}
			<link rel="alternate" hreflang={lang} href={url} />
		{/each}
	{/if}
</svelte:head>
