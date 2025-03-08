<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<section id="contribute" class="section bg-neutral-50">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="text-center max-w-3xl mx-auto mb-16">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">
				{$t('contribute.title')}
			</h2>
			<div class="h-1 w-24 bg-blue-600 mx-auto mb-6 rounded-full"></div>
			<p class="text-lg text-neutral-600">
				{$t('contribute.description')}
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
			<!-- GitHub Contribution Card -->
			<div class="card hover:border-primary/30 animate-fade-in" style="transition-delay: 150ms;">
				<div class="p-8">
					<div
						class="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-8 text-primary"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.491.5.09.682-.217.682-.482 0-.237-.008-.866-.012-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.607.069-.607 1.004.07 1.533 1.032 1.533 1.032.892 1.528 2.341 1.086 2.912.831.091-.646.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.94 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.848.004 1.704.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.201 2.392.1 2.645.641.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.685-4.565 4.933.36.31.678.923.678 1.861 0 1.344-.012 2.428-.012 2.754 0 .268.18.576.688.478A10.005 10.005 0 0022 12c0-5.523-4.477-10-10-10z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-center mb-4">{$t('contribute.github_title')}</h3>
					<p class="text-neutral-600 text-center mb-8">
						{$t('contribute.github_description')}
					</p>
					<div class="flex justify-center">
						<a
							href="https://github.com/nathan-mittelette/boldify"
							target="_blank"
							rel="noopener"
							class="btn btn-primary"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="size-5 mr-2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.491.5.09.682-.217.682-.482 0-.237-.008-.866-.012-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.607.069-.607 1.004.07 1.533 1.032 1.533 1.032.892 1.528 2.341 1.086 2.912.831.091-.646.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.94 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.848.004 1.704.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.201 2.392.1 2.645.641.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.685-4.565 4.933.36.31.678.923.678 1.861 0 1.344-.012 2.428-.012 2.754 0 .268.18.576.688.478A10.005 10.005 0 0022 12c0-5.523-4.477-10-10-10z"
								/>
							</svg>
							{$t('contribute.github_cta')}
						</a>
					</div>
				</div>
			</div>

			<!-- Support Card -->
			<div class="card hover:border-accent/30 animate-fade-in" style="transition-delay: 300ms;">
				<div class="p-8">
					<div
						class="bg-accent/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-8 text-accent"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-center mb-4">{$t('contribute.support_title')}</h3>
					<p class="text-neutral-600 text-center mb-8">
						{$t('contribute.support_description')}
					</p>
					<div class="flex justify-center">
						<a
							href="https://www.buymeacoffee.com/boldify"
							target="_blank"
							rel="noopener"
							class="btn btn-accent"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="size-5 mr-2"
							>
								<path d="M18 8h1a4 4 0 0 1 0 8h-1" />
								<path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
								<line x1="6" y1="1" x2="6" y2="4" />
								<line x1="10" y1="1" x2="10" y2="4" />
								<line x1="14" y1="1" x2="14" y2="4" />
							</svg>
							{$t('contribute.support_cta')}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
