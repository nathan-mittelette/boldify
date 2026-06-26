import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const SAFETY_DELAY_MS = 12000;
const COOLDOWN_SHOWN_DAYS = 7;
const COOLDOWN_DISMISS_DAYS = 30;
const DAY = 24 * 60 * 60 * 1000;

const K_UNTIL = 'bmc_silent_until';
const K_SHOWN = 'bmc_shown_session';

export const isDonationToastVisible = writable(false);

let armed = false;
let safetyTimer: ReturnType<typeof setTimeout> | undefined;

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

function shownThisSession(): boolean {
	if (!browser) return false;
	try {
		return sessionStorage.getItem(K_SHOWN) === '1';
	} catch {
		return false;
	}
}

function markShownThisSession(): void {
	if (!browser) return;
	try {
		sessionStorage.setItem(K_SHOWN, '1');
	} catch {
		// silently fail when storage is restricted (e.g. private browsing)
	}
}

function onVisibilityChange(): void {
	if (document.visibilityState === 'hidden') {
		// user left to paste their text — cancel the safety timer and catch them on return
		clearTimeout(safetyTimer);
	} else {
		// user came back to the tab — ideal "task done" moment to ask
		fire();
	}
}

function fire(): void {
	if (!armed || inCooldown() || shownThisSession()) {
		cleanup();
		return;
	}
	markShownThisSession();
	setCooldown(COOLDOWN_SHOWN_DAYS);
	isDonationToastVisible.set(true);
	cleanup();
}

function cleanup(): void {
	armed = false;
	clearTimeout(safetyTimer);
	safetyTimer = undefined;
	if (browser) document.removeEventListener('visibilitychange', onVisibilityChange);
}

/**
 * Called on every copy. Arms the donation toast on the first copy without interrupting
 * the copy→paste flow, then fires it at the first natural moment that occurs:
 *  - the user returns to the tab (visibilitychange → visible) — preferred,
 *  - the user copies again (clearly engaged) — immediate,
 *  - the user stays on the page past the safety delay — fallback so stayers aren't missed.
 */
export function onCopy(): void {
	if (!browser || inCooldown() || shownThisSession()) return;
	if (armed) {
		fire(); // second copy in the session
		return;
	}
	armed = true;
	document.addEventListener('visibilitychange', onVisibilityChange);
	safetyTimer = setTimeout(fire, SAFETY_DELAY_MS);
}

export function dismissDonationToast(longer: boolean): void {
	if (longer) setCooldown(COOLDOWN_DISMISS_DAYS);
	isDonationToastVisible.set(false);
}

export function handleDonationCTAClick(): void {
	dismissDonationToast(true);
}
