<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<section id="contribute" class="container mx-auto text-center py-12 px-4">
	<div class="bg-white shadow-lg p-8 rounded-md">
		<h3 class="text-3xl font-bold text-primary mb-4">{$t('contribute.title')}</h3>
		<p class="text-lg text-secondary mb-6">
			{$t('contribute.description')}
		</p>
		<div class="flex flex-col md:flex-row items-center justify-center gap-6">
			<a
				href="https://www.buymeacoffee.com/boldify"
				aria-label="Buy me a coffee"
				class="h-[50px] w-[235px]"
				><img
					alt="Buy me a coffee"
					aria-label="Buy me a coffee"
					src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=boldify&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
				/></a
			>
			<a
				href="https://github.com/nathan-mittelette/boldify"
				target="_blank"
				class="flex items-center justify-center h-[50px] w-[235px] space-x-2 bg-secondary text-white font-semibold rounded-lg"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="size-8"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.491.5.09.682-.217.682-.482 0-.237-.008-.866-.012-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.607.069-.607 1.004.07 1.533 1.032 1.533 1.032.892 1.528 2.341 1.086 2.912.831.091-.646.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.94 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.848.004 1.704.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.201 2.392.1 2.645.641.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.685-4.565 4.933.36.31.678.923.678 1.861 0 1.344-.012 2.428-.012 2.754 0 .268.18.576.688.478A10.005 10.005 0 0022 12c0-5.523-4.477-10-10-10z"
					/>
				</svg>
				<span>{$t('contribute.github_cta')}</span>
			</a>
		</div>
	</div>
</section>
