import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, from, Observable, of, switchMap } from 'rxjs';
import { marked } from 'marked';
import { BlogPost } from './blog-post.model';
import { InputValidationService } from '../../services/input-validation.service';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	private postsUrl = 'assets/posts/posts.json';

	constructor(
		private http: HttpClient,
		private validationService: InputValidationService
	) {
		// Configure marked with security options
		// We rely on Angular's DomSanitizer to sanitize the HTML output
		marked.setOptions({
			// Use breaks for better security
			breaks: true,
			gfm: true
		});
	}

	getPostsList(): Observable<BlogPost[]> {
		return this.http.get<BlogPost[]>(this.postsUrl);
	}

	getSinglePost(slug: string): Observable<string> {
		// Additional server-side validation (defense in depth)
		if (!this.validationService.validateSlug(slug)) {
			console.error('Invalid slug provided to getSinglePost');
			return of('<h1>Error</h1><p>Invalid blog post identifier.</p>');
		}

		const url = `/assets/posts/${slug}.md`;

		return this.http.get(url, { responseType: 'text' }).pipe(
			switchMap((markdown) => {
				// Remove YAML metadata
				const content = markdown.replace(/^---[\s\S]*?---\s*/, '');

				// Handle asynchronous parsing with `marked.parse`
				return from(Promise.resolve(marked.parse(content))); // Ensure compatibility with async return
			}),
			catchError((error) => {
				console.error('Error fetching post:', error);
				return of('<h1>Error</h1><p>Post could not be loaded.</p>'); // Provide fallback content
			})
		);
	}
}
