<script lang="ts">
	import { t } from 'svelte-i18n';

	const navItems = [
		{ key: 'nav.home', href: '#introduction' },
		{ key: 'nav.editor', href: '#text-editor' },
		{ key: 'nav.contribute', href: '#contribute' }
	];
</script>

<nav class="bg-primary text-white p-4 shadow-md">
	<div class="container mx-auto flex justify-between items-center">
		<h1 class="text-3xl font-bold flex items-center">Boldify</h1>
		<ul class="flex gap-4">
			{#each navItems as { key, href }}
				<li>
					<a {href} class="hover:text-secondary transition duration-300">{$t(key)}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
