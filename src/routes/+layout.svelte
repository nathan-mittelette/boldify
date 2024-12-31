<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Snackbar from '$lib/components/Snackbar.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex flex-col min-h-screen bg-background text-text">
	<Navbar />
	{@render children?.()}
	<Footer />
	<Snackbar />
</div>
