<!--
  JSON-LD Schema Component

  Workaround: Svelte ne permet pas d'inclure <script> dans <svelte:head> directement.
  On utilise {@html} avec \u003c (unicode pour "<") pour éviter que le parser
  interprète </script> comme la fermeture du bloc script du composant.
  Ref: https://github.com/sveltejs/svelte/issues/3841
-->
<script lang="ts">
	interface Props {
		schema: Record<string, unknown>;
	}

	let { schema }: Props = $props();

	const jsonLdScript = $derived(
		`<script type="application/ld+json">${JSON.stringify(schema)}\u003c/script>`
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdScript}
</svelte:head>
