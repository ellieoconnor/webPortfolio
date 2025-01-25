import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { BlogPost, BlogPostMetadata } from './blog.model';
import matter from 'gray-matter';
import { marked } from 'marked';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	// Relative folder path where markdown files are stored.
	private postsPath = 'assets/posts/';

	constructor(private http: HttpClient) {}

	/**
	 * Retrieves all blog post metadata by processing blog post files.
	 *
	 * @return {Observable<BlogPostMetadata[]>} An observable emitting an array of blog post metadata.
	 */
	fetchAllPostsMetadata(): Observable<BlogPostMetadata[]> {
		return this.fetchBlogPostFiles().pipe(
			map((fileNames: string[]) => fileNames.map((fileName) => fileName.replace('.md', ''))),
			switchMap((slugs: string[]) => {
				const metadataRequests = slugs.map((slug) => this.fetchMetadataBySlug(slug));
				return forkJoin(metadataRequests);
			}),
			catchError(() => of([]))
		);
	}

	/**
	 * Fetches a specific markdown file by slug.
	 *
	 * @param slug - The slug (file name without extension)
	 * @return An observable containing the file content as a string.
	 */
	fetchBlogPost(slug: string): Observable<BlogPost> {
		const filePath = `${this.postsPath}${slug}.md`;
		return this.http.get(filePath, { responseType: 'text' }).pipe(
			switchMap((fileContent: string) => this.parseMarkdownFile(fileContent, slug)),
			catchError(() => of({ metadata: {} as BlogPostMetadata, content: '' } as BlogPost))
		);
	}

	/**
	 * Fetches the metadata (YAML frontmatter) of a specific blog post
	 * @param slug
	 * @return Observable<BlogPostMetadata>
	 */
	private fetchMetadataBySlug(slug: string): Observable<BlogPostMetadata> {
		const filePath = `${this.postsPath}${slug}.md`;
		return this.http.get(filePath, { responseType: 'text' }).pipe(
			map((fileContent: string) => this.parseMetadata(fileContent, slug)),
			catchError(() => of({ title: '', date: '', description: '', status: 'draft', slug } as BlogPostMetadata))
		);
	}

	private fetchBlogPostFiles(): Observable<string[]> {
		return this.http.get<string[]>('assets/posts/index.json');
	}
	// todo - should I be sanitizing the output HTML
	private async parseMarkdownFile(fileContent: string, slug: string): Promise<BlogPost> {
		const { data, content } = matter(fileContent); // Extract YAML frontmatter and Markdown content
		const parsedContent = await marked.parse(content);
		return {
			metadata: { ...data, slug } as BlogPostMetadata, // Add slug to metadata
			content: parsedContent // Convert markdown to HTML using marked
		};
	}

	private parseMetadata(fileContent: string, slug: string): BlogPostMetadata {
		const { data } = matter(fileContent);
		return { ...data, slug } as BlogPostMetadata;
	}
}
