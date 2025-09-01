<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Snackbar from '$lib/components/Snackbar.svelte';
	import { locale } from '$lib/services/i18n.service';
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
</script>

<div class="flex flex-col min-h-screen bg-background text-text">
	<Navbar />
	{@render children?.()}
	<Footer />
	<Snackbar />
</div>
