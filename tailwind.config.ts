import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#1E3A8A', // Bleu foncé
				secondary: '#2563EB', // Bleu vif
				accent: '#FACC15', // Jaune pastel
				background: '#F1F5F9', // Gris très clair
				text: '#1F2937' // Gris anthracite
			}
		}
	},
	plugins: []
} as Config;
