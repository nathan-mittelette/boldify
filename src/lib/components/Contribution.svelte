<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<section id="github" class="container mx-auto text-center py-12 px-4">
	<div class="bg-white shadow-lg p-8 rounded-md">
		<h3 class="text-3xl font-bold text-primary mb-4">{$t('github.title')}</h3>
		<p class="text-lg mb-6 text-secondary">{$t('github.description')}</p>
		<a
			href="https://github.com/nathan-mittelette/boldify"
			target="_blank"
			class="inline-block bg-secondary text-white font-semibold px-6 py-3 rounded-md hover:brightness-110 transition duration-300"
		>
			{$t('github.cta')}
		</a>
	</div>
</section>
