import { writable } from 'svelte/store';

export const text = writable<string>('');

// Shared across editor mounts; an empty edited draft must also be retained.
export const draftEdited = writable(false);
