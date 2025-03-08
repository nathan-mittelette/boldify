/**
 * Type of snackbar notification that determines its appearance
 */
export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

/**
 * Interface for snackbar notifications
 */
export interface Snackbar {
	/** Unique identifier for the snackbar */
	id: string;
	/** Title text displayed prominently */
	title: string;
	/** Optional descriptive text providing more detail */
	description?: string;
	/** The type/severity of the notification which affects styling */
	type?: SnackbarType;
}
