import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { supportedLanguages } from './src/params/lang.ts';

const langPlugin = () =>
	({
		name: 'lang-plugin',
		apply: 'build',
		buildApp: {
			order: 'post',
			async handler() {
				const buildDir = 'build';

				const processDir = (dir: string) => {
					if (!existsSync(dir)) return;

					const files = readdirSync(dir);

					for (const file of files) {
						const filePath = join(dir, file);
						const stat = statSync(filePath);

						if (stat.isDirectory()) {
							processDir(filePath);
						} else if (file.endsWith('.html')) {
							const content = readFileSync(filePath, 'utf8');

							// Determine language from file path using supportedLanguages
							// default to the first supported language
							let lang = supportedLanguages[0] ?? 'fr';

							for (const l of supportedLanguages) {
								// match directory like `/en/` or filename like `en.html`
								if (filePath.includes(`/${l}/`) || file === `${l}.html`) {
									lang = l;
									break;
								}
							}

							// Replace lang attribute
							const updatedContent = content.replace(/<html lang="fr"/g, `<html lang="${lang}"`);

							if (updatedContent !== content) {
								writeFileSync(filePath, updatedContent, 'utf8');
							}
						}
					}
				};

				processDir(buildDir);
			}
		}
	}) as Plugin;

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			// Consult https://svelte.dev/docs/kit/integrations
			// for more information about preprocessors
			preprocess: vitePreprocess(),

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter({ fallback: '404.html', strict: true })
		}),
		tailwindcss(),
		langPlugin(),
		devtoolsJson()
	]
});
