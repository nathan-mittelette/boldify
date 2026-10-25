import twitterText from 'twitter-text';

/** Remove exactly the terminal newline owned by Quill, retaining user line breaks. */
export function extractPostContent(quillText: string): string {
	return quillText.endsWith('\n') ? quillText.slice(0, -1) : quillText;
}

export function countXPost(content: string) {
	const used = twitterText.parseTweet(content).weightedLength;
	return {
		used,
		remaining: 280 - used,
		state: used > 280 ? 'over' : used >= 260 ? 'warning' : 'normal'
	} as const;
}
