<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { initI18n } from '$lib/services/i18n.service';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex flex-col min-h-screen bg-background text-text">
	{#await initI18n()}
		<div>Loading...</div>
	{:then _}
		<Navbar />
		{@render children?.()}
		<Footer />
	{/await}
</div>
