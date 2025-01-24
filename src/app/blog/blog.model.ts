export interface BlogPostMetadata {
	title: string;
	date: string;
	description: string;
	status: string;
	slug: string;
}

export interface BlogPost {
	metadata: BlogPostMetadata;
	content: string;
}
