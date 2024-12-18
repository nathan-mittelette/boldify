<script lang="ts">
	import { text } from '$lib/stores/text.store';
</script>

<div class="max-xl:w-[50vw] w-[30vw]">
	<p>Preview your post !</p>
	<pre class="whitespace-pre-wrap break-words">{$text}</pre>
</div>
