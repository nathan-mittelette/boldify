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
}
