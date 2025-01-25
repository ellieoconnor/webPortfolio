import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { BlogPost, BlogPostMetadata } from './blog.model';
import { marked } from 'marked/lib/marked';
import matter from 'gray-matter';

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

	/** Fetching metadata for all blog posts by reading markdown files. */
	getAllPosts(): Observable<BlogPostMetadata[]> {
		// Retrieve the list of markdown files from the directory
		return this.getBlogPostFiles().pipe(
			map((fileNames: string[]) => fileNames.map((fileName) => fileName.replace('.md', ''))), //create slugs
			map((slugs: string[]) => {
				const metadataRequests = slugs.map((slug) => this.getBlogPostMetadata(slug));
				return forkJoin(metadataRequests); // Combine all metadata requests into a single observable
			}),
			map((requests: Observable<BlogPostMetadata[]>) => requests),
			catchError(() => [] as BlogPostMetadata[]) // if there's an error (e.g., no files), return an empty array.
		);
	}

	/**
	 * Fetches a specific markdown file by slug.
	 *
	 * @param slug - The slug (file name without extension)
	 * @return An observable containing the file content as a string.
	 */
	getBlogPost(slug: string): Observable<BlogPost> {
		const filePath = `${this.postsPath}${slug}.md`;
		return this.http.get(filePath, { responseType: 'text' }).pipe(
			map((fileContent: string) => {
				const { data, content } = matter(fileContent); // Extract YAML frontmatter and Markdown content
				return {
					metadata: { ...data, slug } as BlogPostMetadata, // Add slug to metadata
					content: marked.parse(content) // Convert markdown to HTML using marked
				} as BlogPost;
			}),
			catchError(
				() =>
					// Return an empty placeholder object in case of errors
					({ metadata: {} as BlogPostMetadata, content: '' }) as BlogPost
			)
		);
	}

	/**
	 * Fetches the metadata (YAML frontmatter) of a specific blog post
	 * @param slug
	 * @return Observable<BlogPostMetadata>
	 */
	private getBlogPostMetadata(slug: string): Observable<BlogPostMetadata> {
		const filePath = `${this.postsPath}${slug}.md`;
		return this.http.get(filePath, { responseType: 'text' }).pipe(
			map((fileContent: string) => {
				const { data } = matter(fileContent); // Extract YAML frontmatter
				return { ...data, slug } as BlogPostMetadata; // Add slug to metadata
			}),
			catchError(
				() =>
					// Return empty metadata if an error occurs
					({ title: '', date: '', description: '', status: 'draft', slug }) as BlogPostMetadata
			)
		);
	}

	private getBlogPostFiles(): Observable<string[]> {
		// NOTE: Replace this with code to dynamically fetch file names if backend/dynamic options are available.
		// For now, we will simulate file list for development.
		return new Observable<string[]>((observer) => {
			// Simulated markdown file names
			observer.next(['post1.md', 'post2.md', 'post3.md']);
			observer.complete();
		});
	}
}
