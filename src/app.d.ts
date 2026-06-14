// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	type ClarityCommand =
		| ['event', string]
		| ['set', string, string | string[]]
		| ['identify', string, string?, string?, string?]
		| ['consent']
		| ['upgrade', string];

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		clarity?: (...args: ClarityCommand) => void;
	}
}

export {};
