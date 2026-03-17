export interface BlogPost {
	id: number; // dev.to article ID
	title: string;
	slug: string;
	description: string; // article description/summary
	publishedAt: Date;
	coverImage?: string; // cover image URL
	url: string; // dev.to article URL
	readingTimeMinutes: number;
	tagList: string[];
}

// Response from dev.to API for a single article (includes body_html)
export interface DevToArticle extends BlogPost {
	bodyHtml: string;
}

// Raw API response from dev.to (snake_case)
export interface DevToApiResponse {
	id: number;
	title: string;
	slug: string;
	description: string;
	published_at: string;
	cover_image: string | null;
	url: string;
	reading_time_minutes: number;
	tag_list: string[];
	body_html?: string;
}
