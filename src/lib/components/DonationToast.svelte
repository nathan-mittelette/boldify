<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { t } from 'svelte-i18n';
	import {
		isDonationToastVisible,
		dismissDonationToast,
		handleDonationCTAClick
	} from '$lib/services/donation-toast.service';
	import { trackBuyMeACoffeeClicked, trackClarityEvent } from '$lib/services/clarity.service';

	const BMC_URL = 'https://buymeacoffee.com/boldify';
	const AUTO_HIDE_MS = 12000;

	let timer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		if ($isDonationToastVisible) {
			trackClarityEvent('buymeacoffee_toast_shown');
			timer = setTimeout(() => {
				dismissDonationToast(false);
			}, AUTO_HIDE_MS);
		} else {
			clearTimeout(timer);
		}
		return () => clearTimeout(timer);
	});

	function onCtaClick() {
		trackBuyMeACoffeeClicked('donation_toast');
		handleDonationCTAClick();
	}

	function onDismiss() {
		trackClarityEvent('buymeacoffee_toast_dismissed');
		dismissDonationToast(true);
	}
</script>

{#if $isDonationToastVisible}
	<div
		in:fly={{ y: 50, duration: 400, easing: backOut }}
		out:fade={{ duration: 300 }}
		class="w-full relative overflow-hidden rounded-xl border border-amber-200 bg-amber-50 shadow-2xl shadow-amber-100/60 p-4"
		role="status"
		aria-live="polite"
	>
		<div
			class="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-amber-400 to-yellow-400"
		></div>

		<div class="flex gap-3 pt-1">
			<div class="flex-shrink-0 text-2xl leading-none mt-0.5">☕</div>

			<div class="flex-1 min-w-0">
				<p class="font-semibold text-sm text-amber-900 mb-1">{$t('donation_toast.title')}</p>
				<p class="text-sm text-amber-800/75 leading-relaxed mb-3">
					{$t('donation_toast.message')}
				</p>

				<div class="flex items-center gap-3 flex-wrap">
					<a
						href={BMC_URL}
						target="_blank"
						rel="noopener noreferrer"
						onclick={onCtaClick}
						class="inline-flex items-center gap-1.5 rounded-lg bg-[#ffdd00] px-3 py-1.5 text-sm font-semibold text-amber-900 transition-[filter] hover:brightness-95 active:brightness-90"
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M10 2v2M14 2v2M16 8a4 4 0 0 1 0 8h-1" />
							<path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
						</svg>
						{$t('donation_toast.cta')}
					</a>

					<button
						onclick={onDismiss}
						class="text-sm text-amber-600/60 transition-colors hover:text-amber-700 cursor-pointer"
					>
						{$t('donation_toast.later')}
					</button>
				</div>
			</div>

			<button
				onclick={onDismiss}
				class="flex-shrink-0 self-start p-0.5 text-amber-400 transition-colors hover:text-amber-600 cursor-pointer"
				aria-label="Close"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
		</div>
	</div>
{/if}
