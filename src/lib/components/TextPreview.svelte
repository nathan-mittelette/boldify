<script lang="ts">
	import { t } from 'svelte-i18n';

	interface Props {
		name: string;
		degree: string;
		position: string;
		timePosted: string;
		text: string;
		smallButtons: boolean;
	}

	interface TextHiglight {
		text: string;
		highlight: boolean;
	}

	let { name, degree, position, timePosted, text, smallButtons }: Props = $props();

	let customizedText = $derived(
		text
			.split(' ')
			.flatMap((word) => {
				return word.split(/(\n)/);
			})
			.map((word) => {
				let wordText = word;

				if (!wordText.endsWith('\n')) {
					wordText += ' ';
				}

				if (word.startsWith('#') || word.startsWith('http://') || word.startsWith('https://')) {
					return { text: wordText, highlight: true } as TextHiglight;
				}
				return { text: wordText, highlight: false } as TextHiglight;
			})
	);
</script>

<div class="flex flex-col bg-white post-container shadow-sm rounded-md m-auto my-4 z-10">
	<div class="px-4 pt-3 mb-2 flex items-center">
		<enhanced:img
			src="/static/profile.png"
			title="User Avatar"
			width="72"
			height="72"
			alt="User Avatar"
			class="size-12 rounded-full"
		/>
		<div class="flex-1 p-[2px] ml-3 cursor-pointer flex justify-between">
			<div>
				<p>
					<span
						class="text-sm font-semibold text-[#000000E5] hover:text-[#0A66C2FF] hover:underline"
						>{name}
					</span><span class="text-sm font-light text-[#00000099]">• {degree}</span>
				</p>
				<p class="text-xs text-[#00000099]">{position}</p>
				<div class="flex justify-start">
					<span class="text-xs text-[#00000099]">{timePosted} • </span>
					<span class="ml-1"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							data-supported-dps="16x16"
							fill="currentColor"
							class="mercado-match"
							width="16"
							height="16"
							focusable="false"
						>
							<path
								d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"
							></path>
						</svg></span
					>
				</div>
			</div>
			<button
				class="ml-auto p-1 text-gray-400 hover:text-gray-600 rounded-full h-fit hover:bg-gray-200 transition-colors cursor-pointer"
				aria-label="More"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
					></path>
				</svg>
			</button>
		</div>
	</div>
	<div class="mx-3 text-container" data-clarity-mask="true">
		<pre
			class="text-[#000000E5] text-sm whitespace-pre-wrap break-words">{#each customizedText as word (word)}{#if word.highlight}<span
						class="highlight">{word.text}</span
					>{:else}{word.text}{/if}{/each}</pre>
	</div>
	<div>
		<div class="mx-3 py-2 text-right data-container flex justify-between items-center">
			<div
				class="flex items-center cursor-pointer hover:text-[#0A66C2FF] text-[#00000099] hover:underline"
			>
				<img
					class="size-4"
					width="16"
					height="16"
					src="/love.svg"
					alt="Love Icon"
					title="Love Icon"
				/>
				<img
					class="size-4 ml-[-4px]"
					width="16"
					height="16"
					src="/like.svg"
					alt="Like Icon"
					title="Like Icon"
				/>
				<img
					class="size-4 ml-[-4px]"
					width="16"
					height="16"
					title="Interesting Icon"
					src="/interesting.svg"
					alt="Interesting Icon"
				/>
				<span class="text-sm">100</span>
			</div>
			<div>
				<span class="cursor-pointer text-sm text-[#00000099] hover:text-[#0A66C2FF] hover:underline"
					>12 {$t('preview.comments')}</span
				>
				<span> • </span>
				<span class="cursor-pointer text-sm text-[#00000099] hover:text-[#0A66C2FF] hover:underline"
					>4 {$t('preview.reposts')}</span
				>
			</div>
		</div>
		<div class="px-4 py-1 flex">
			<button
				class="flex-1 action-button{smallButtons
					? ' action-button-small'
					: ''} flex items-center justify-center hover:cursor-pointer"
				aria-label="Like"
			>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						id="thumbs-up-outline-small"
						role="none"
						data-supported-dps="16x16"
						fill="currentColor"
						width="16"
						height="16"
					>
						<path
							d="M12.91 7l-2.25-2.57a8.21 8.21 0 01-1.5-2.55L9 1.37A2.08 2.08 0 007 0a2.08 2.08 0 00-2.06 2.08v1.17a5.81 5.81 0 00.31 1.89l.28.86H2.38A1.47 1.47 0 001 7.47a1.45 1.45 0 00.64 1.21 1.48 1.48 0 00-.37 2.06 1.54 1.54 0 00.62.51h.05a1.6 1.6 0 00-.19.71A1.47 1.47 0 003 13.42v.1A1.46 1.46 0 004.4 15h4.83a5.61 5.61 0 002.48-.58l1-.42H14V7zM12 12.11l-1.19.52a3.59 3.59 0 01-1.58.37H5.1a.55.55 0 01-.53-.4l-.14-.48-.49-.21a.56.56 0 01-.34-.6l.09-.56-.42-.42a.56.56 0 01-.09-.68L3.55 9l-.4-.61A.28.28 0 013.3 8h5L7.14 4.51a4.15 4.15 0 01-.2-1.26V2.08A.09.09 0 017 2a.11.11 0 01.08 0l.18.51a10 10 0 001.9 3.24l2.84 3z"
						></path>
					</svg>
				</span>
				<span class="pl-1 max-lg:hidden">{$t('preview.like')}</span></button
			>
			<button
				class="flex-1 action-button{smallButtons
					? ' action-button-small'
					: ''} flex items-center justify-center hover:cursor-pointer"
				aria-label="Comment"
			>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						id="comment-small"
						role="none"
						data-supported-dps="16x16"
						fill="currentColor"
						width="16"
						height="16"
					>
						<path
							d="M5 8h5v1H5zm11-.5v.08a6 6 0 01-2.75 5L8 16v-3H5.5A5.51 5.51 0 010 7.5 5.62 5.62 0 015.74 2h4.76A5.5 5.5 0 0116 7.5zm-2 0A3.5 3.5 0 0010.5 4H5.74A3.62 3.62 0 002 7.5 3.53 3.53 0 005.5 11H10v1.33l2.17-1.39A4 4 0 0014 7.58zM5 7h6V6H5z"
						></path>
					</svg>
				</span>
				<span class="pl-1 max-lg:hidden">{$t('preview.comment')}</span></button
			>
			<button
				class="flex-1 action-button{smallButtons
					? ' action-button-small'
					: ''} flex items-center justify-center hover:cursor-pointer"
				aria-label="Repost"
			>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						id="repost-small"
						role="none"
						data-supported-dps="16x16"
						fill="currentColor"
						width="16"
						height="16"
					>
						<path
							d="M4 10H2V5c0-1.66 1.34-3 3-3h3.85L7.42 0h2.44L12 3 9.86 6H7.42l1.43-2H5c-.55 0-1 .45-1 1v5zm8-4v5c0 .55-.45 1-1 1H7.15l1.43-2H6.14L4 13l2.14 3h2.44l-1.43-2H11c1.66 0 3-1.34 3-3V6h-2z"
						></path>
					</svg>
				</span>
				<span class="pl-1 max-lg:hidden">{$t('preview.repost')}</span></button
			>
			<button
				class="flex-1 action-button{smallButtons
					? ' action-button-small'
					: ''} flex items-center justify-center hover:cursor-pointer"
				aria-label="Send"
			>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						class="rtl-flip"
						id="send-privately-small"
						role="none"
						data-supported-dps="16x16"
						fill="currentColor"
						width="16"
						height="16"
					>
						<path d="M14 2L0 6.67l5 2.64 5.67-3.98L6.7 11l2.63 5L14 2z"></path>
					</svg>
				</span>
				<span class="pl-1 max-lg:hidden">{$t('preview.send')}</span></button
			>
		</div>
	</div>
</div>

<style lang="scss">
	.post-container {
		color: rgba(0, 0, 0, 0.6);
		border: 1px solid var(--color-neutral-200);
		max-width: 555px;

		* {
			font-family:
				-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
				'Fira Sans', Ubuntu, Oxygen, 'Oxygen Sans', Cantarell, 'Droid Sans', 'Apple Color Emoji',
				'Segoe UI Emoji', 'Segoe UI Symbol', 'Lucida Grande', Helvetica, Arial, sans-serif;
		}

		.data-container {
			border-bottom: 1px solid var(--color-neutral-200);
		}

		.text-container {
			max-height: calc(60vh - 46px - 46px);
			overflow-y: auto;
		}

		.action-button {
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
			line-height: 20px;
			font-weight: 600;
			padding: 0.4rem 1.6rem;
			border-radius: 4px;
			transition: all 0.2s ease;

			&.action-button-small {
				padding: 0.4rem 1rem;
			}

			&:hover {
				background-color: var(--color-neutral-100);
				color: var(--color-primary);
			}
		}

		.highlight {
			color: var(--color-primary);
			font-weight: 600;
			font-size: 14px;
			cursor: pointer;
			transition: all 0.15s ease;

			&:hover {
				text-decoration: underline;
				color: var(--color-primary-dark);
			}
		}
	}
</style>
