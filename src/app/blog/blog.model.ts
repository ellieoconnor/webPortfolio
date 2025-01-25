export interface BlogPostMetadata {
	title: string;
	date: string;
	description: string;
	status: string;
	slug: string;
	[key: string]: any; // Allows other fields dynamically
}

export interface BlogPost {
	metadata: BlogPostMetadata;
	content: string;
}
