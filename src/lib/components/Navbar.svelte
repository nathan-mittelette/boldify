<script lang="ts">
	type NavItem = {
		key: string;
		href: `/${SupportedLanguages}${string}`;
		badge?: string;
	};

	import { t } from 'svelte-i18n';
	import { locale } from '$lib/services/i18n.service';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { SupportedLanguages } from '../../params/lang';

	let scrollY = $state(0);
	let innerWidth = $state(0);
	let mobileMenuOpen = $state(false);
	let isScrolled = $derived(scrollY > 20);
	let isMcpPage = $derived(page.url.pathname.includes('/mcp'));

	function isActive(href: string): boolean {
		const path = page.url.pathname;
		// Home: exact match only (avoid matching /mcp, /about, etc.)
		if (href === `/${$locale}` || href === '/') {
			return path === `/${$locale}` || path === '/';
		}
		return path === href || path.startsWith(href + '/');
	}

	const navItems = $derived<NavItem[]>([
		{ key: 'nav.home', href: `/${$locale as SupportedLanguages}` },
		{ key: 'nav.mcp', href: `/${$locale as SupportedLanguages}/mcp`, badge: 'new' },
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

	function getHomeUrl(currentLang: string | null | undefined): `/${string}` | '/' {
		if (currentLang === 'fr' || currentLang === null || currentLang === undefined) {
			return '/';
		} else {
			return `/${currentLang}`;
		}
	}
</script>

<svelte:window bind:scrollY bind:innerWidth />

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled
		? 'bg-white shadow-lg py-3'
		: 'bg-transparent py-6'} {isMcpPage ? 'navbar-mcp' : ''}"
>
	<div class="container mx-auto flex justify-between items-center px-4">
		<div class="flex items-center">
			<p class="text-2xl font-bold">
				<a class={isMcpPage ? 'text-mcp' : 'gradient-text'} href={resolve(getHomeUrl($locale))}>
					Boldify
				</a>
			</p>
		</div>

		<!-- Desktop Menu -->
		<ul class="hidden md:flex items-center gap-6">
			{#each navItems as { key, href, badge } (key)}
				{@const active = isActive(href)}
				<li>
					<a
						href={resolve(href)}
						class="font-medium flex items-center gap-1.5 {isMcpPage
							? active
								? 'text-mcp'
								: 'text-neutral-700 hover:text-mcp'
							: active
								? 'text-primary'
								: isScrolled
									? 'text-neutral-700 hover:text-primary'
									: 'text-gray-400 hover:text-primary'}"
						onclick={closeMobileMenu}
					>
						<span
							class="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-300 {isMcpPage
								? 'after:bg-mcp'
								: 'after:bg-primary'} {active ? 'after:w-full' : 'after:w-0 hover:after:w-full'}"
						>
							{$t(key)}
						</span>
						{#if badge}
							<span
								class="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold leading-none
									{isMcpPage ? 'bg-mcp/10 text-mcp' : 'bg-primary/10 text-primary'}"
							>
								{badge}
							</span>
						{/if}
					</a>
				</li>
			{/each}
			<li>
				<a
					href="https://buymeacoffee.com/boldify"
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
			class="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-neutral-200 animate-fade-in {isMcpPage
				? 'border-mcp/20'
				: ''}"
		>
			<ul class="py-3 px-4 flex flex-col gap-4">
				{#each navItems as { key, href, badge } (key)}
					{@const active = isActive(href)}
					<li>
						<a
							href={resolve(href)}
							class="block py-2 font-medium flex items-center gap-1.5 {isMcpPage
								? active
									? 'text-mcp'
									: 'text-neutral-700 hover:text-mcp'
								: active
									? 'text-primary'
									: 'text-neutral-700 hover:text-primary'}"
							onclick={closeMobileMenu}
						>
							{$t(key)}
							{#if badge}
								<span
									class="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold leading-none {isMcpPage
										? 'bg-mcp/10 text-mcp'
										: 'bg-primary/10 text-primary'}"
								>
									{badge}
								</span>
							{/if}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="https://buymeacoffee.com/boldify"
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
