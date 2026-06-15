<script lang="ts">
	import { snackbars, removeSnackbar } from '$lib/stores/snackbar.store';
	import { fly, fade } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	// Function to dismiss a snackbar manually
	function dismiss(id: string) {
		removeSnackbar(id);
	}
</script>

{#each $snackbars as { id, title, description }, i (id)}
	<div
		in:fly={{ y: 50, duration: 400, delay: i * 100, easing: backOut }}
		out:fade={{ duration: 300 }}
		class="w-full bg-white border border-neutral-200 flex items-start gap-3 p-4 rounded-xl shadow-lg backdrop-blur-sm"
	>
		<div class="flex-shrink-0 text-emerald-500 mt-0.5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="size-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
		</div>

		<div class="flex-1 min-w-0">
			<h3 class="font-semibold text-sm text-neutral-900">{title}</h3>
			{#if description}
				<p class="text-sm mt-0.5 text-neutral-500">{description}</p>
			{/if}
		</div>

		<button
			on:click={() => dismiss(id)}
			class="p-0.5 flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
			aria-label="Close notification"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="size-4"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
{/each}
