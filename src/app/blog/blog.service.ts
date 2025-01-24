import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './blog.model';
import { marked } from 'marked/lib/marked';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	/**
	 * 1. Fetching blog posts
	 * ** Retrieve Markdown files from src/assets/posts
	 * ** Optionally parse their metadata (like title, date, and description)
	 *
	 * 2. Processing Metadata:
	 * ** Extract YAML frontmatter (metadata) from the markdown files to display details like titles, dates, or statuses.
	 *
	 * 3. Filtering Posts:
	 * ** Show only published posts or drafts based on their metadata.
	 *
	 * 4. Fetching a Specific Post
	 * ** Retrieve a single Markdown file based on its unique identifier (slug).
	 *
	 * 5. Preparing Data for Components
	 * ** Convert raw Markdown into HTML for rendering in the blog post component.
	 */

	// Relative folder path where markdown files are stored.
	private postsPath = 'assets/posts/';

	constructor(private http: HttpClient) {}

	/** Fetching blog posts */
	getAllPosts() {}

	/**
	 * Fetches a specific markdown file by slug.
	 *
	 * @param slug - The slug (file name without extension)
	 * @return An observable containing the file content as a string.
	 */
	getBlogPost(slug: string): Observable<BlogPost> {
		const filePath = `${this.postsPath}${slug}.md`;
		return this.http.get<BlogPost>(filePath);
	}

	/**
	 * Parses raw Markdown content into HTML
	 *
	 * @param markdownContent - The raw Markdown string to be parsed.
	 */
	parseContentHTML(markdownContent: string): string | Promise<string> {
		return marked(markdownContent);
	}
}
