<script lang="ts">
	import Intro from '$lib/components/Intro.svelte';
	import TextPreview from '$lib/components/TextPreview.svelte';
	import Contribution from '$lib/components/Contribution.svelte';
	import TextEditor from '$lib/components/TextEditor.svelte';
</script>

<Intro />
<section
	class="flex-1 p-4 flex w-full justify-around max-md:items-center max-md:flex-col gap-4"
	id="text-editor"
>
	<TextEditor />
	<TextPreview />
</section>
<Contribution />
