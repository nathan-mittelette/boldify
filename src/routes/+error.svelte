<script lang="ts">
	import { page } from '$app/state';
	import { t } from 'svelte-i18n';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { resolve } from '$app/paths';

	// Error code mapping
	const errorMessages = {
		400: {
			icon: '😕',
			title: 'bad_request',
			description: 'bad_request_desc'
		},
		401: {
			icon: '🔐',
			title: 'unauthorized',
			description: 'unauthorized_desc'
		},
		403: {
			icon: '🚫',
			title: 'forbidden',
			description: 'forbidden_desc'
		},
		404: {
			icon: '😵‍💫',
			title: 'not_found',
			description: 'not_found_desc'
		},
		500: {
			icon: '🛠️',
			title: 'server_error',
			description: 'server_error_desc'
		},
		502: {
			icon: '🌐',
			title: 'bad_gateway',
			description: 'bad_gateway_desc'
		},
		503: {
			icon: '🔧',
			title: 'service_unavailable',
			description: 'service_unavailable_desc'
		}
	};

	// Get error code from status or default to 404
	// eslint-disable-next-line no-undef
	function getErrorCode(error: App.Error | null): number {
		if (!error) return 404;

		// Try to extract status from error message or use 404 as fallback
		if (typeof error === 'object' && 'message' in error) {
			const statusMatch = error.message?.match(/(\d{3})/);
			if (statusMatch) {
				return parseInt(statusMatch[1]);
			}
		}

		return 404;
	}

	// Reactive error info based on page error
	const errorCode = getErrorCode(page.error);
	const errorInfo = errorMessages[errorCode as keyof typeof errorMessages] || errorMessages[404];
</script>

<SEOHead
	title={$t('error.title')}
	description={$t('error.description')}
	keywords={$t('error.keywords')}
	canonicalUrl="https://boldify.net/error"
/>

<div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
	<div class="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8 md:p-12 text-center border">
		<!-- Error Icon -->
		<div class="text-6xl md:text-8xl mb-6" role="img" aria-label="Error icon">
			{errorInfo.icon}
		</div>

		<!-- Error Code -->
		<div class="text-6xl md:text-8xl font-bold text-gray-800 mb-6">
			{errorCode}
		</div>

		<!-- Error Title -->
		<h1 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
			{$t(`error.${errorInfo.title}`)}
		</h1>

		<!-- Error Description -->
		<p class="text-lg text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
			{$t(`error.${errorInfo.description}`)}
		</p>

		<!-- Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
			<a
				href={resolve('/')}
				class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
			>
				<span>🏠</span>
				{$t('error.back_home')}
			</a>

			<a
				href={resolve('/help')}
				class="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
			>
				<span>❓</span>
				{$t('error.help_center')}
			</a>
		</div>

		<!-- Developer Info (only in dev mode) -->
		{#if import.meta.env.DEV && page.error}
			<details class="bg-gray-50 rounded-lg p-4 text-left mb-6 border">
				<summary class="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
					🔍 Developer Information
				</summary>
				<div class="mt-3 space-y-2 text-sm font-mono text-gray-600">
					<div><strong>Status:</strong> {errorCode}</div>
					{#if page.error.message}
						<div><strong>Message:</strong> {page.error.message}</div>
					{/if}
					{#if page.route?.id}
						<div><strong>Route:</strong> {page.route.id}</div>
					{/if}
					<div><strong>URL:</strong> {page.url.pathname}</div>
				</div>
			</details>
		{/if}

		<!-- Support Information -->
		<div class="border-t border-gray-200 pt-6 text-center">
			<p class="text-gray-600 mb-3">
				{$t('error.need_help')}
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
				<a
					href="mailto:mittelette.nathan@gmail.com"
					class="text-blue-600 hover:text-blue-800 transition-colors"
				>
					📧 {$t('error.contact_email')}
				</a>
				<a
					href="https://github.com/nathan-mittelette/boldify/issues"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-600 hover:text-blue-800 transition-colors"
				>
					🐛 {$t('error.report_issue')}
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
	}

	/* Ensure the error page takes full height */
	:global(html, body) {
		height: 100%;
	}
</style>
