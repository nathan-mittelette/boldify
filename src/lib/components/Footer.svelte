<script lang="ts">
	import { _, t } from 'svelte-i18n';
	import { locale, SUPPORTED_LANGUAGES } from '$lib/services/i18n.service';

	const FLAGS: Record<string, string> = {
		fr: '🇫🇷',
		en: '🇬🇧'
	};
</script>

<footer class="bg-primary text-white text-center py-4 relative">
	<!-- Texte traduit -->
	<p class="text-sm">© 2024 Boldify. {$t('footer.rights')}</p>

	<p class="text-xs mt-2">
		{$t('footer.clarityMessage')}
	</p>

	<!-- Drapeaux pour changer la langue -->
	<div class="absolute top-1/2 right-4 transform -translate-y-1/2 flex space-x-4">
		{#each SUPPORTED_LANGUAGES as lang}
			<button
				on:click={() => locale.set(lang)}
				class="text-xl hover:opacity-80 focus:outline-none lang-button bg-white rounded-full"
				aria-label="{$_('footer.changeLanguage')} {lang}"
			>
				{FLAGS[lang] ?? lang}
			</button>
		{/each}
	</div>
</footer>

<style>
	.lang-button {
		width: 32px;
		height: 32px;
	}
</style>
