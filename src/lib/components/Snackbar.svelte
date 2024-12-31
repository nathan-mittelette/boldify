<script lang="ts">
	import { snackbars } from '$lib/stores/snackbar.store';
</script>

<div
	class="fixed bottom-4 md:right-4 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 space-y-4 z-50"
>
	{#each $snackbars as { title, description }}
		<div
			class="bg-secondary text-white px-4 py-3 rounded-md shadow-md transition-opacity duration-300"
		>
			<strong>{title}</strong>
			<p class="text-sm">{description}</p>
		</div>
	{/each}
</div>
