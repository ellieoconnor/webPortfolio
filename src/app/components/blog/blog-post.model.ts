export interface BlogPost {
	title: string; // blog post title
	slug: string;
	datePublished: Date; // date the post is published
	summary?: string; // optional a short summary of the blog post
	isFeatured?: boolean;
}
