<script lang="ts">
	import { locale } from '#lib/services/i18n.service.js';
	import { page } from '$app/state';
	import {
		platforms,
		platformUrl,
		sectionFromPath,
		type Platform
	} from '#lib/models/platform.model.js';
	import { resolve } from '$app/paths';
	let { platform }: { platform: Platform } = $props();
	const section = $derived(sectionFromPath(page.url.pathname));
</script>

<nav aria-label="LinkedIn / X" class="platform-switch" data-platform-switch={platform}>
	<span class="switch-indicator" aria-hidden="true"></span>
	{#each ['linkedin', 'x'] as target (target)}
		{@const selected = target === platform}
		<a
			href={resolve(platformUrl(target as Platform, $locale ?? 'fr', section).slice(1))}
			aria-current={selected ? 'page' : undefined}
			data-sveltekit-keepfocus>{platforms[target as Platform].name}</a
		>
	{/each}
</nav>

<style>
	.platform-switch {
		position: relative;
		isolation: isolate;
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 4px;
		border: 1px solid var(--color-neutral-300);
		border-radius: 999px;
		width: 150px;
		flex-shrink: 0;
		background: var(--color-white);
	}
	.switch-indicator {
		position: absolute;
		inset: 4px auto 4px 4px;
		width: calc((100% - 8px) / 2);
		border-radius: 999px;
		background: var(--color-primary);
		box-shadow: 0 1px 3px #0002;
		transition:
			transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
			background-color 240ms ease;
		z-index: -1;
	}
	[data-platform-switch='x'] .switch-indicator {
		transform: translateX(100%);
	}
	a {
		padding: 7px 8px;
		border-radius: 999px;
		text-align: center;
		font-size: 13px;
		font-weight: 600;
		color: var(--color-neutral-600);
		transition: color 180ms ease;
	}
	a[aria-current='page'] {
		color: white;
	}
	a:not([aria-current]):hover {
		color: var(--color-text);
	}
	a:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 3px;
	}
	@media (prefers-reduced-motion: reduce) {
		.switch-indicator,
		a {
			transition: none;
		}
	}
</style>
