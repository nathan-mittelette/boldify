<script lang="ts">
	export let title: string;
	export let description: string;
	export let keywords: string;
	export let canonicalUrl: string = 'https://boldify.net/';
	export let ogImage: string = 'https://boldify.net/favicon-96x96.png';
	export let languages: { lang: string; url: string }[] = [];
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

	{#if languages.length > 0}
		{#each languages as { lang, url } (lang)}
			<link rel="alternate" hreflang={lang} href={url} />
		{/each}
	{/if}
</svelte:head>
