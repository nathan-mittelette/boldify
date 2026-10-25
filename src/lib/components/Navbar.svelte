<script lang="ts">
	type NavItem = {
		key: string;
		href: `/${string}`;
		badge?: string;
	};

	import PlatformSwitch from './PlatformSwitch.svelte';
	import { platforms, platformUrl, type Platform } from '#lib/models/platform.model.js';
	let { platform = 'linkedin' }: { platform?: Platform } = $props();

	import { t } from 'svelte-i18n';
	import { locale } from '#lib/services/i18n.service.js';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { trackBuyMeACoffeeClicked } from '#lib/services/clarity.service.js';
	import { coffeeCue } from '#lib/stores/coffee-cue.store.js';

	let scrollY = $state(0);
	let innerWidth = $state(0);
	let mobileMenuOpen = $state(false);
	let isScrolled = $derived(scrollY > 20);
	let isMcpPage = $derived(platform === 'linkedin' && page.url.pathname.includes('/mcp'));

	function isActive(href: string): boolean {
		const path = page.url.pathname;
		if (platform === 'linkedin' && href === '/' && path === '/fr') return true;
		return path.replace(/\/$/, '') === href.replace(/\/$/, '');
	}

	const navItems = $derived<NavItem[]>([
		{ key: 'nav.home', href: platformUrl(platform, $locale ?? 'fr') },
		{ key: 'nav.mcp', href: platformUrl(platform, $locale ?? 'fr', 'mcp'), badge: 'new' },
		{ key: 'nav.about', href: platformUrl(platform, $locale ?? 'fr', 'about') },
		{ key: 'nav.how_it_works', href: platformUrl(platform, $locale ?? 'fr', 'how-it-works') },
		{ key: 'nav.help', href: platformUrl(platform, $locale ?? 'fr', 'help') }
	]);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function trackMobileBuyMeACoffeeClick() {
		trackBuyMeACoffeeClicked('navbar_mobile');
		closeMobileMenu();
	}

	function getHomeUrl(currentLang: string | null | undefined): `/${string}` | '/' {
		return platforms[platform].home(currentLang ?? 'fr');
	}
</script>

<svelte:window bind:scrollY bind:innerWidth />

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled
		? 'bg-white shadow-lg py-3'
		: platform === 'x'
			? 'bg-white/95 py-6'
			: 'bg-transparent py-6'} {isMcpPage ? 'navbar-mcp' : ''}"
>
	<div class="container mx-auto flex justify-between items-center px-4">
		<div class="flex items-center">
			<p class="text-2xl font-bold">
				<a
					class={platform === 'x' ? 'text-black' : isMcpPage ? 'text-mcp' : 'gradient-text'}
					href={resolve(getHomeUrl($locale).slice(1))}
				>
					Boldify
				</a>
			</p>
		</div>

		<PlatformSwitch {platform} />

		<!-- Desktop Menu -->
		<ul class="hidden xl:flex items-center gap-5">
			{#each navItems as { key, href, badge } (key)}
				{@const active = isActive(href)}
				<li>
					<a
						href={resolve(href.slice(1))}
						aria-current={active ? 'page' : undefined}
						class="font-medium flex items-center gap-1.5 {isMcpPage
							? active
								? 'text-mcp'
								: 'text-neutral-700 hover:text-mcp'
							: active
								? 'text-primary'
								: isScrolled
									? 'text-neutral-700 hover:text-primary'
									: platform === 'x'
										? 'text-neutral-600 hover:text-primary'
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
					class="btn ml-4 bg-support text-neutral-900 hover:bg-support-hover focus:ring-support shadow-sm ring-1 ring-neutral-300/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-neutral-300/50"
					onclick={() => trackBuyMeACoffeeClicked('navbar_desktop')}
				>
					<span class="coffee-cup-wrap mr-2">
						{#key $coffeeCue}
							{#if $coffeeCue > 0}
								<span class="coffee-steam" aria-hidden="true">
									<span></span>
									<span></span>
									<span></span>
								</span>
							{/if}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="size-5 {$coffeeCue > 0 ? 'coffee-bob' : ''}"
							>
								<path d="M18 8h1a4 4 0 0 1 0 8h-1" />
								<path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
								<line x1="6" y1="1" x2="6" y2="4" />
								<line x1="10" y1="1" x2="10" y2="4" />
								<line x1="14" y1="1" x2="14" y2="4" />
							</svg>
						{/key}
					</span>
					{$t('contribute.support_cta')}
				</a>
			</li>
		</ul>

		<!-- Mobile Menu Toggle -->
		<button
			class="xl:hidden text-neutral-800 focus:outline-none"
			onclick={toggleMobileMenu}
			aria-label="Toggle menu"
			aria-expanded={mobileMenuOpen}
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
			class="xl:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-neutral-200 animate-fade-in {isMcpPage
				? 'border-mcp/20'
				: ''}"
		>
			<ul class="py-3 px-4 flex flex-col gap-4">
				{#each navItems as { key, href, badge } (key)}
					{@const active = isActive(href)}
					<li>
						<a
							href={resolve(href.slice(1))}
							aria-current={active ? 'page' : undefined}
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
						class="btn w-full justify-center bg-support text-neutral-900 hover:bg-support-hover focus:ring-support shadow-sm ring-1 ring-neutral-300/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-neutral-300/50"
						onclick={trackMobileBuyMeACoffeeClick}
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

<style>
	.coffee-cup-wrap {
		position: relative;
		display: inline-flex;
		align-items: center;
	}

	.coffee-steam {
		position: absolute;
		top: -5px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 2px;
		pointer-events: none;
	}

	.coffee-steam span {
		width: 2px;
		height: 6px;
		border-radius: 9999px;
		background: currentColor;
		opacity: 0;
		animation: coffee-steam 1.1s ease-out forwards;
	}

	.coffee-steam span:nth-child(2) {
		animation-delay: 0.15s;
	}

	.coffee-steam span:nth-child(3) {
		animation-delay: 0.3s;
	}

	.coffee-bob {
		animation: coffee-bob 0.55s ease-out;
	}

	@keyframes coffee-steam {
		0% {
			opacity: 0;
			transform: translateY(2px) scaleY(0.6);
		}
		35% {
			opacity: 0.6;
		}
		100% {
			opacity: 0;
			transform: translateY(-7px) scaleY(1);
		}
	}

	@keyframes coffee-bob {
		0%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-2px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.coffee-steam span,
		.coffee-bob {
			animation: none;
		}
	}
</style>
