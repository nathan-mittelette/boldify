import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const SHOW_AFTER_COPIES = 2;
const COOLDOWN_SHOWN_DAYS = 3;
const COOLDOWN_DISMISS_DAYS = 14;
const DAY = 24 * 60 * 60 * 1000;

const K_COUNT = 'bmc_copy_count';
const K_UNTIL = 'bmc_silent_until';

export const isDonationToastVisible = writable(false);

function setCooldown(days: number): void {
	if (!browser) return;
	try {
		localStorage.setItem(K_UNTIL, String(Date.now() + days * DAY));
	} catch {
		// silently fail when storage is restricted (e.g. private browsing)
	}
}

function inCooldown(): boolean {
	if (!browser) return false;
	try {
		const until = Number(localStorage.getItem(K_UNTIL) ?? '0');
		return !isNaN(until) && Date.now() < until;
	} catch {
		return false;
	}
}

export function maybeShowDonationToast(): boolean {
	if (!browser) return false;
	if (inCooldown()) return false;

	let n = 0;
	try {
		n = (+(sessionStorage.getItem(K_COUNT) ?? '0') || 0) + 1;
		sessionStorage.setItem(K_COUNT, String(n));
	} catch {
		// silently fail when storage is restricted (e.g. private browsing)
	}

	if (n < SHOW_AFTER_COPIES) return false;

	setCooldown(COOLDOWN_SHOWN_DAYS);
	try {
		sessionStorage.removeItem(K_COUNT);
	} catch {
		// silently fail when storage is restricted (e.g. private browsing)
	}
	isDonationToastVisible.set(true);
	return true;
}

export function dismissDonationToast(longer: boolean): void {
	if (longer) setCooldown(COOLDOWN_DISMISS_DAYS);
	isDonationToastVisible.set(false);
}

export function handleDonationCTAClick(): void {
	dismissDonationToast(true);
}
