import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { BlogPost, DevToApiResponse } from './blog-post.model';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	private readonly devToUsername = 'ellieoconnor';
	private readonly devToApiUrl = 'https://dev.to/api/articles';
	// dev.to's CDN can serve a stale article list for hours. Changing the URL every
	// 5 minutes forces a fresh cache entry, so new posts show up within minutes.
	private readonly cacheBustIntervalMs = 5 * 60 * 1000;

	constructor(private http: HttpClient) {}

	getPostsList(): Observable<BlogPost[]> {
		const cacheBust = Math.floor(Date.now() / this.cacheBustIntervalMs);
		const url = `${this.devToApiUrl}?username=${this.devToUsername}&_=${cacheBust}`;

		return this.http.get<DevToApiResponse[]>(url).pipe(
			map((articles) => articles.map((article) => this.mapToBlogPost(article))),
			catchError((error) => {
				console.error('Error fetching posts from dev.to:', error);
				return of([]);
			})
		);
	}

	getSinglePost(articleId: number): Observable<{ post: BlogPost; bodyHtml: string } | null> {
		if (!articleId || articleId <= 0) {
			console.error('Invalid article ID provided');
			return of(null);
		}

		const url = `${this.devToApiUrl}/${articleId}`;

		return this.http.get<DevToApiResponse>(url).pipe(
			map((article) => ({
				post: this.mapToBlogPost(article),
				bodyHtml: article.body_html || ''
			})),
			catchError((error) => {
				console.error('Error fetching post from dev.to:', error);
				return of(null);
			})
		);
	}

	private mapToBlogPost(article: DevToApiResponse): BlogPost {
		return {
			id: article.id,
			title: article.title,
			slug: article.slug,
			description: article.description,
			publishedAt: new Date(article.published_at),
			coverImage: article.cover_image || undefined,
			url: article.url,
			readingTimeMinutes: article.reading_time_minutes,
			tagList: this.toTagList(article.tag_list)
		};
	}

	private toTagList(tagList: string[] | string | null | undefined): string[] {
		if (!tagList) {
			return [];
		}
		if (Array.isArray(tagList)) {
			return tagList;
		}
		return tagList
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);
	}
}
