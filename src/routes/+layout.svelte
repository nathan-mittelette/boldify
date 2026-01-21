<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Snackbar from '$lib/components/Snackbar.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { locale } from '$lib/services/i18n.service';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		const unsubscriber = locale.subscribe((lang) => {
			if (lang) {
				document.documentElement.lang = lang;
			}
		});

		if ($locale) {
			document.documentElement.lang = $locale;
		}

		return unsubscriber;
	});

	const organizationSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Boldify',
		url: 'https://boldify.net/',
		email: 'mittelette.nathan@gmail.com',
		logo: 'https://boldify.net/favicon-96x96.png',
		description: $t('introduction.description'),
		sameAs: ['https://github.com/nathan-mittelette/boldify'],
		contactPoint: [
			{
				'@type': 'ContactPoint',
				telephone: '+33-634184685',
				contactType: 'technical support',
				contactOption: 'TollFree',
				email: 'mittelette.nathan@gmail.com',
				hoursAvailable: 'Mo,Tu,We,Th,Fr 08:00-12:00 14:00-18:00',
				availableLanguage: ['French', 'English']
			},
			{
				'@type': 'ContactPoint',
				telephone: '+33-634184685',
				contactType: 'customer service',
				contactOption: 'TollFree',
				email: 'mittelette.nathan@gmail.com',
				hoursAvailable: 'Mo,Tu,We,Th,Fr 08:00-12:00 14:00-18:00',
				availableLanguage: ['French', 'English']
			}
		]
	});

	const websiteSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Boldify',
		alternateName: 'Boldify Rajoutez du style à vos post LinkedIn',
		url: 'https://boldify.net/',
		description: $t('home.description')
	});
</script>

<JsonLd schema={organizationSchema} />
<JsonLd schema={websiteSchema} />

<div class="flex flex-col min-h-screen bg-background text-text">
	<Navbar />
	{@render children?.()}
	<Footer />
	<Snackbar />
</div>
