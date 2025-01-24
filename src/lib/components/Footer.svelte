<script lang="ts">
	import { _, t } from 'svelte-i18n';
	import { locale, SUPPORTED_LANGUAGES } from '$lib/services/i18n.service';

	const FLAGS: Record<string, string> = {
		fr: '🇫🇷',
		en: '🇬🇧'
	};
</script>

<footer class="bg-primary text-white text-center py-4 relative">
	<p class="text-sm">© 2025 Boldify. {$t('footer.rights')}</p>

	<p class="text-xs mt-2">
		{$t('footer.clarityMessage')}
	</p>

	<div
		class="md:absolute md:top-1/2 md:right-4 md:transform md:-translate-y-1/2 max-md:pt-2 flex justify-center space-x-4"
	>
		{#each SUPPORTED_LANGUAGES as lang}
			<button
				on:click={() => locale.set(lang)}
				class="text-xl hover:opacity-80 focus:outline-hidden lang-button bg-white rounded-full"
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
