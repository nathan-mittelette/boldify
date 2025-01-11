<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<section class="container mx-auto text-center py-12 px-4" id="introduction">
	<h2 class="text-4xl font-extrabold mb-4 text-primary">{$t('introduction.title')}</h2>
	<p class="text-lg text-secondary mt-4">{$t('introduction.description')}</p>
	<p
		class="mt-4 text-sm font-semibold py-2 px-4 inline-block rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300"
	>
		{$t('introduction.beta')}
	</p>
</section>
