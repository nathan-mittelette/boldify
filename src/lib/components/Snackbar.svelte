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
	{#each $snackbars as { id, title, description, type }, i (id)}
		<div
			in:fly={{ y: 50, duration: 400, delay: i * 100, easing: backOut }}
			out:fade={{ duration: 300 }}
			class="snackbar {type ||
				'success'} flex items-start gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm transition-all"
		>
			<div class="snackbar-icon flex-shrink-0">
				{#if type === 'error'}
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
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z"
						/>
					</svg>
				{:else if type === 'warning'}
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
							d="M12 9v3.75m9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z"
						/>
					</svg>
				{:else}
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
				{/if}
			</div>

			<div class="snackbar-content flex-1">
				<h3 class="font-medium text-base">{title}</h3>
				{#if description}
					<p class="text-sm mt-1 opacity-90">{description}</p>
				{/if}
			</div>

			<button
				on:click={() => dismiss(id)}
				class="p-1 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
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

<style>
	.snackbar {
		min-width: 300px;
		max-width: 450px;
		color: white;
	}

	.snackbar.success {
		background-color: rgba(var(--color-primary-rgb), 0.85);
	}

	.snackbar.error {
		background-color: rgba(220, 38, 38, 0.85);
	}

	.snackbar.warning {
		background-color: rgba(234, 179, 8, 0.85);
	}

	.snackbar.info {
		background-color: rgba(14, 165, 233, 0.85);
	}
</style>
