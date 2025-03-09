<script lang="ts">
	import { snackbars, removeSnackbar } from '$lib/stores/snackbar.store';
	import { fly, fade } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	// Function to dismiss a snackbar manually
	function dismiss(id: string) {
		removeSnackbar(id);
	}
</script>

<div
	class="fixed bottom-8 md:right-8 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 space-y-4 z-50"
>
	{#each $snackbars as { id, title, description }, i (id)}
		<div
			in:fly={{ y: 50, duration: 400, delay: i * 100, easing: backOut }}
			out:fade={{ duration: 300 }}
			class="max-w-[300px] min-w-[375px] text-primary bg-white/85 flex items-start gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm transition-all"
		>
			<div class="snackbar-icon flex-shrink-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			</div>

			<div class="snackbar-content flex-1">
				<h3 class="font-medium text-base">{title}</h3>
				{#if description}
					<p class="text-sm mt-1 opacity-90">{description}</p>
				{/if}
			</div>

			<button
				on:click={() => dismiss(id)}
				class="p-1 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
				aria-label="Close notification"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="size-5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	{/each}
</div>
