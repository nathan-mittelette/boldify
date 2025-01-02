import { writable } from 'svelte/store';
import type { Snackbar } from '$lib/models/snackbar.model';

export const snackbars = writable<Snackbar[]>([]);

export function addSnackbar(snackbar: Snackbar) {
	snackbars.update((snackbars) => [...snackbars, snackbar]);

	setTimeout(() => {
		snackbars.update((snackbars) => snackbars.filter((snackbar) => snackbar !== snackbar));
	}, 3000);
}
