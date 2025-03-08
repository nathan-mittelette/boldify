import { writable } from 'svelte/store';
import type { Snackbar } from '$lib/models/snackbar.model';

export const snackbars = writable<Snackbar[]>([]);

/**
 * Adds a new snackbar notification
 * @param snackbar The snackbar data to add
 */
export function addSnackbar(snackbar: Omit<Snackbar, 'id'>) {
	// Generate a unique ID for this snackbar
	const id = `snackbar-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

	// Add the snackbar to the store with its unique ID
	const newSnackbar = { id, ...snackbar };
	snackbars.update((snackbars) => [...snackbars, newSnackbar]);

	// Auto-remove after timeout unless it's an error that might need attention
	const timeout = snackbar.type === 'error' ? 6000 : 4000;
	setTimeout(() => {
		removeSnackbar(id);
	}, timeout);

	return id; // Return the ID in case it's needed for reference or early removal
}

/**
 * Removes a specific snackbar by ID
 * @param id The ID of the snackbar to remove
 */
export function removeSnackbar(id: string) {
	snackbars.update((snackbars) => snackbars.filter((snackbar) => snackbar.id !== id));
}
