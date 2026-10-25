<script lang="ts">
	import { t } from 'svelte-i18n';
	import { platforms, type Platform } from '#lib/models/platform.model.js';
	import { countXPost } from '#lib/utils/post-content.js';
	let { platform, content }: { platform: Platform; content: string } = $props();
	const config = $derived(platforms[platform]);
	const count = $derived(countXPost(platform === 'x' ? content : ''));
	const color = $derived(
		`hsl(${Math.max(0, (config.limit - content.length) / config.limit) * 120}, 80%, 30%)`
	);
</script>

{#if platform === 'x'}
	<div
		data-testid="post-counter"
		data-state={count.state}
		role="status"
		class="rounded-lg px-3 py-2 text-sm text-black bg-neutral-50"
		class:font-bold={count.state !== 'normal'}
	>
		{count.remaining}
		{$t('x.remaining')} · {$t('x.standard_post')}
		{#if count.state !== 'normal'}<span class="block"
				>⚠ {$t(count.state === 'over' ? 'x.over_limit' : 'x.near_limit')}</span
			>{/if}
	</div>
{:else}
	<div
		class="text-sm font-medium py-1 px-3 rounded-full"
		style:color
		style:background-color={`color-mix(in srgb, ${color} 15%, transparent)`}
	>
		{content.length} / {platforms.linkedin.limit}
		{$t('editor.characters')}
	</div>
{/if}
