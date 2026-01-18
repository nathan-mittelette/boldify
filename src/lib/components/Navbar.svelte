<script lang="ts">
	type NavItem = {
		key: string;
		href: `/${SupportedLanguages}${string}`;
	};

	import { t } from 'svelte-i18n';
	import { locale } from '$lib/services/i18n.service';
	import { resolve } from '$app/paths';
	import type { SupportedLanguages } from '../../params/lang';

	let scrollY = $state(0);
	let innerWidth = $state(0);
	let mobileMenuOpen = $state(false);
	let isScrolled = $derived(scrollY > 20);

	const navItems = $derived<NavItem[]>([
		{ key: 'nav.home', href: `/${$locale as SupportedLanguages}` },
		{ key: 'nav.about', href: `/${$locale as SupportedLanguages}/about` },
		{ key: 'nav.how_it_works', href: `/${$locale as SupportedLanguages}/how-it-works` },
		{ key: 'nav.help', href: `/${$locale as SupportedLanguages}/help` }
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
			<p class="text-2xl font-bold">
				<a class="gradient-text" href={resolve(`/${$locale}`)}>Boldify</a>
			</p>
		</div>

		<!-- Desktop Menu -->
		<ul class="hidden md:flex items-center gap-6">
			{#each navItems as { key, href } (key)}
				<li>
					<a
						href={resolve(href)}
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
					href="https://www.buymeacoffee.com/boldify"
					target="_blank"
					rel="noopener"
					class="btn btn-accent ml-4"
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
							href={resolve(href)}
							class="block py-2 font-medium text-neutral-700 hover:text-primary"
							onclick={closeMobileMenu}
						>
							{$t(key)}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="https://www.buymeacoffee.com/boldify"
						target="_blank"
						rel="noopener"
						class="btn btn-accent w-full justify-center"
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
				</li>
			</ul>
		</div>
	{/if}
</nav>

<!-- This div provides spacing to account for the fixed navbar -->
<div class="h-24"></div>
