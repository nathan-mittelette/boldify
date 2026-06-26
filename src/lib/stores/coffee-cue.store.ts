import { writable } from 'svelte/store';

/**
 * Bumped on each successful copy. The navbar "Buy me a coffee" button watches this
 * counter to play a one-shot steam cue, tying the converting channel to the value moment.
 */
export const coffeeCue = writable(0);

export function triggerCoffeeCue(): void {
	coffeeCue.update((n) => n + 1);
}
