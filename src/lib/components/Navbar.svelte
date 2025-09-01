<script lang="ts">
	import { t } from 'svelte-i18n';
	import { locale } from '$lib/services/i18n.service';

	let scrollY = $state(0);
	let innerWidth = $state(0);
	let mobileMenuOpen = $state(false);
	let isScrolled = $derived(scrollY > 20);

	const navItems = $derived([
		{ key: 'nav.home', href: `/${$locale}` },
		{ key: 'nav.about', href: `/${$locale}/about` },
		{ key: 'nav.how_it_works', href: `/${$locale}/how-it-works` },
		{ key: 'nav.help', href: `/${$locale}/help` }
	]);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window bind:scrollY bind:innerWidth />

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled
		? 'bg-white text-primary shadow-lg py-3'
		: 'bg-transparent text-gray-300 py-6'}"
>
	<div class="container mx-auto flex justify-between items-center px-4">
		<div class="flex items-center">
			<h1 class="text-2xl font-bold">
				<a class="gradient-text" href="/{$locale}">Boldify</a>
			</h1>
		</div>

		<!-- Desktop Menu -->
		<ul class="hidden md:flex items-center gap-6">
			{#each navItems as { key, href } (key)}
				<li>
					<a
						{href}
						class="font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full {isScrolled
							? 'text-neutral-700 hover:text-primary'
							: 'text-gray-400 hover:text-primary'}"
						onclick={closeMobileMenu}
					>
						{$t(key)}
					</a>
				</li>
			{/each}
			<li>
				<a
					href="https://github.com/nathan-mittelette/boldify"
					target="_blank"
					rel="noopener"
					class="btn btn-primary ml-4"
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
					GitHub
				</a>
			</li>
		</ul>

		<!-- Mobile Menu Toggle -->
		<button
			class="md:hidden text-neutral-800 focus:outline-none"
			onclick={toggleMobileMenu}
			aria-label="Toggle menu"
		>
			{#if mobileMenuOpen}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			{/if}
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div
			class="md:hidden absolute top-full left-0 right-0 bg-white text-primary shadow-lg border-t border-neutral-200 animate-fade-in"
		>
			<ul class="py-3 px-4 flex flex-col gap-4">
				{#each navItems as { key, href } (key)}
					<li>
						<a
							{href}
							class="block py-2 font-medium text-neutral-700 hover:text-primary"
							onclick={closeMobileMenu}
						>
							{$t(key)}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="https://github.com/nathan-mittelette/boldify"
						target="_blank"
						rel="noopener"
						class="btn btn-primary w-full justify-center"
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
						GitHub
					</a>
				</li>
			</ul>
		</div>
	{/if}
</nav>

<!-- This div provides spacing to account for the fixed navbar -->
<div class="h-24"></div>
