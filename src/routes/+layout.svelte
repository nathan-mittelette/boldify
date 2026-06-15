<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Snackbar from '$lib/components/Snackbar.svelte';
	import DonationToast from '$lib/components/DonationToast.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { locale } from '$lib/services/i18n.service';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

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
		email: 'contact@boldify.net',
		logo: 'https://boldify.net/favicon-96x96.png',
		description: $t('introduction.description'),
		sameAs: [
			'https://github.com/nathan-mittelette/boldify',
			'https://github.com/nathan-mittelette/boldify-mcp'
		],
		contactPoint: [
			{
				'@type': 'ContactPoint',
				contactType: 'customer support',
				email: 'contact@boldify.net',
				availableLanguage: ['French', 'English']
			}
		]
	});

	const websiteSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Boldify',
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
	<div
		class="fixed bottom-8 md:right-8 max-md:left-1/2 max-md:-translate-x-1/2 z-50 flex flex-col gap-4 w-[360px] max-w-[calc(100vw-2rem)]"
	>
		<Snackbar />
		<DonationToast />
	</div>
</div>
