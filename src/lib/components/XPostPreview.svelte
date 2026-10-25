<script lang="ts">
	import { t } from 'svelte-i18n';
	import profile from '#lib/assets/profile.png?enhanced';
	let {
		text,
		name = 'John Doe',
		timePosted = '4 h'
	}: { text: string; name?: string; timePosted?: string } = $props();
	const handle = $derived(name.toLowerCase().replace(/\s+/g, ''));
	const parts = $derived(text.split(/(#[\p{L}\p{N}_]+)/u));
	const actions = [
		{
			label: 'preview.comment',
			tone: 'blue',
			count: '75',
			path: 'M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z'
		},
		{
			label: 'preview.repost',
			tone: 'green',
			count: '15',
			path: 'M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z'
		},
		{
			label: 'preview.like',
			tone: 'pink',
			count: '234',
			path: 'M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z'
		},
		{
			label: 'x.views',
			tone: 'blue',
			count: '56k',
			path: 'M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z'
		},
		{
			label: 'x.bookmark',
			tone: 'blue',
			count: '',
			path: 'M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z'
		},
		{
			label: 'x.share',
			tone: 'blue',
			count: '',
			path: 'M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z'
		}
	];
</script>

<article class="post-container x-post" data-testid="x-preview">
	<div class="avatar"><enhanced:img src={profile} width="40" height="40" alt="" /></div>
	<div class="post-content">
		<header class="identity">
			<span class="name">{name}</span>
			<span class="handle">@{handle}</span>
			<span class="time">· {timePosted}</span>
			<span class="header-icons" aria-hidden="true">
				<svg viewBox="0 0 33 32"
					><path
						d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"
					/></svg
				>
				<svg viewBox="0 0 24 24"
					><path
						d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
					/></svg
				>
			</span>
		</header>
		<p class="post-text" data-testid="x-preview-text" data-clarity-mask="true">
			{#each parts as part, i (i)}{#if part.startsWith('#')}<span class="hashtag">{part}</span
					>{:else}{part}{/if}{/each}
		</p>
		<div class="actions">
			{#each actions as action (action.label)}
				<span
					class="action"
					data-tone={action.tone}
					role="img"
					aria-label={`${$t(action.label)}${action.count ? ` · ${action.count}` : ''}`}
				>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d={action.path} /></svg>
					{#if action.count}<span>{action.count}</span>{/if}
				</span>
			{/each}
		</div>
	</div>
</article>

<style>
	.x-post {
		container-type: inline-size;
		display: flex;
		gap: 12px;
		margin-block: 16px;
		padding: 12px 16px;
		border-block: 1px solid #eff3f4;
		background: white;
		color: #0f1419;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 15px;
		line-height: 20px;
	}
	.avatar {
		flex: 0 0 40px;
	}
	.avatar :global(img) {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.post-content {
		flex: 1;
		min-width: 0;
	}
	.identity {
		display: flex;
		align-items: center;
		gap: 4px;
		min-width: 0;
	}
	.name {
		flex-shrink: 0;
		max-width: 45%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 700;
	}
	.handle {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #536471;
	}
	.time {
		flex-shrink: 0;
		white-space: nowrap;
		color: #536471;
	}
	.header-icons {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 12px;
		margin-left: auto;
		padding-left: 4px;
		color: #536471;
	}
	svg {
		width: 20px;
		height: 20px;
		fill: currentColor;
		flex-shrink: 0;
	}
	.post-text {
		margin: 2px 0 0;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		max-height: calc(60vh - 92px);
		overflow-y: auto;
	}
	.hashtag {
		color: inherit;
	}
	.actions {
		padding-inline: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		margin-top: 12px;
		color: #536471;
		font-size: 13px;
		line-height: 20px;
	}
	.action {
		--action-color: #1d9bf0;
		position: relative;
		isolation: isolate;
		cursor: pointer;
		transition: color 140ms ease-out;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		white-space: nowrap;
	}
	/* X engagement palette and pill motion, verified against the public X client. */
	.action[data-tone='green'] {
		--action-color: #00ba7c;
	}
	.action[data-tone='pink'] {
		--action-color: #f91880;
	}
	.action::before {
		content: '';
		position: absolute;
		inset: -7px -8px;
		z-index: -1;
		border-radius: 9999px;
		background: color-mix(in srgb, var(--action-color) 10%, transparent);
		opacity: 0;
		transform: scale(0.88);
		transition:
			opacity 140ms ease-out,
			transform 140ms ease-out;
		pointer-events: none;
	}
	@media (hover: hover) {
		.action:hover {
			color: var(--action-color);
		}
		.action:hover::before {
			opacity: 1;
			transform: scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.action,
		.action::before {
			transition: none;
		}
	}
	@container (max-width: 360px) {
		.identity {
			flex-wrap: wrap;
			column-gap: 4px;
		}
		.name {
			max-width: 55%;
		}
		.header-icons {
			gap: 6px;
		}
		.header-icons svg:first-child {
			display: none;
		}
		.actions {
			gap: 4px;
			font-size: 11px;
		}
		.action {
			gap: 2px;
		}
		.actions svg {
			width: 16px;
			height: 16px;
		}
	}
</style>
