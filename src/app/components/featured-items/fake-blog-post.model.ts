export interface FakeBlogPost {
	title: string; // blog post title
	subtitle?: string; // optional subtitle
	datePublished: Date; // date the post is published
	isPublished: boolean; // reflects if the blog has been published yet
	summary?: string; // optional a short summary of the blog post
	author?: string; // optional author name
}
