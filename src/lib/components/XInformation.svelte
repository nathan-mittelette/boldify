<script lang="ts">
	import About from '#lib/pages/About.svelte';
	import HowItWorks from '#lib/pages/HowItWorks.svelte';
	import Help from '#lib/pages/Help.svelte';
	import Mcp from '#lib/pages/Mcp.svelte';
	import type { XSection } from '#lib/models/platform.model.js';
	let { section }: { section: XSection } = $props();
</script>

{#if section === 'about'}<About />{:else if section === 'how-it-works'}<HowItWorks
	/>{:else if section === 'help'}<Help />{:else}<Mcp />{/if}
