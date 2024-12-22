<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<section class="container mx-auto text-center py-12 px-4" id="introduction">
	<h2 class="text-4xl font-extrabold mb-4 text-primary">{$t('introduction.title')}</h2>
	<p class="text-lg text-secondary">{$t('introduction.description')}</p>
</section>
