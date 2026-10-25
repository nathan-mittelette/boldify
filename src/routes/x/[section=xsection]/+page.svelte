<script lang="ts">
	import { page } from '$app/state';
	import XInformation from '#lib/components/XInformation.svelte';
	import type { XSection } from '#lib/models/platform.model.js';
</script>

<XInformation section={page.params.section as XSection} />
