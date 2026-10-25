import { derived } from 'svelte/store';
import { t as originalTranslations } from 'svelte-i18n';
import { getPlatformContext } from './platform-context';
import type { Platform } from '#lib/models/platform.model.js';

// Only platform-specific copy changes. All page structure and general translations are shared.
const X_MESSAGE_OVERRIDES: Record<string, string> = {
	'home.title': 'x.title',
	'home.description': 'x.description',
	'home.keywords': 'x.keywords',
	'editor.default_text': 'x.default_text',
	'editor.placeholder': 'x.placeholder',
	'editor.copied_description': 'x.copied_description',
	'introduction.preview': 'x.default_text',
	'help.preview_sample_text': 'x.default_text',
	'about.hero_desc_new': 'x.about_intro',
	'about.preview_desc': 'x.preview_notice',
	'how_it_works.step1_desc': 'x.formats_description',
	'how_it_works.step2_desc': 'x.preview_notice',
	'how_it_works.editor_feature1_desc': 'x.format_note',
	'how_it_works.editor_feature2_desc': 'x.counting_explanation',
	'help.preview_section_desc': 'x.preview_notice',
	'help.formatting_a1': 'x.rendering_explanation',
	'help.formatting_a2': 'x.formats_description',
	'help.linkedin_q1': 'x.counting_question',
	'help.linkedin_a1': 'x.counting_explanation'
};

export function adaptPlatformMessage(message: string, key: string, platform: Platform): string {
	// The creator's origin story is historical, rather than a claim about the current platform.
	if (platform === 'linkedin' || key === 'about.creator_story_desc') return message;
	return message.replace(/linkedin/gi, (name) => (name === 'linkedin' ? 'twitter' : 'X'));
}

export function platformTranslations() {
	const platform = getPlatformContext();
	return derived(originalTranslations, (translate) => (...args: Parameters<typeof translate>) => {
		if (platform() === 'linkedin') return translate(...args);
		const [id, options] = args;
		const key = typeof id === 'string' ? id : id.id;
		const override = X_MESSAGE_OVERRIDES[key];
		if (override)
			return translate(typeof id === 'string' ? override : { ...id, id: override }, options);
		return adaptPlatformMessage(translate(...args), key, 'x');
	});
}
