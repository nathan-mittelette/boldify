import { expect, it } from 'vitest';
import { adaptPlatformMessage } from './platform-i18n.service';
import en from '../../locales/en.json';

it('leaves LinkedIn copy unchanged', () => {
	expect(adaptPlatformMessage(en.introduction.title, 'introduction.title', 'linkedin')).toBe(
		en.introduction.title
	);
});
it('adapts platform references without changing the rest of a shared page', () => {
	expect(adaptPlatformMessage('Write your LinkedIn post.', 'mcp.example', 'x')).toBe(
		'Write your X post.'
	);
	expect(adaptPlatformMessage('linkedin text formatter', 'home.keywords', 'x')).toBe(
		'twitter text formatter'
	);
});
it('preserves the actual origin story', () => {
	expect(adaptPlatformMessage(en.about.creator_story_desc, 'about.creator_story_desc', 'x')).toBe(
		en.about.creator_story_desc
	);
});
