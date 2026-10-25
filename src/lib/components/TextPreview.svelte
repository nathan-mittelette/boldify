<script lang="ts">
	import LinkedInPostPreview from './LinkedInPostPreview.svelte';
	import XPostPreview from './XPostPreview.svelte';
	import { getPlatformContext } from '#lib/services/platform-context.js';
	const platform = getPlatformContext();
	let {
		name,
		degree,
		position,
		timePosted,
		text,
		smallButtons
	}: {
		name: string;
		degree: string;
		position: string;
		timePosted: string;
		text: string;
		smallButtons: boolean;
	} = $props();
</script>

{#if platform() === 'x'}<XPostPreview {text} {name} {timePosted} />{:else}<LinkedInPostPreview
		{name}
		{degree}
		{position}
		{timePosted}
		{text}
		{smallButtons}
	/>{/if}
