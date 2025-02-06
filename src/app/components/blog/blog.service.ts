import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { marked } from 'marked';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	constructor(private http: HttpClient) {}

	getPostsList(): Observable<{ title: string; slug: string }[]> {
		return this.http.get<{ title: string; slug: string }[]>('assets/posts/posts.json');
	}

	getSinglePost(slug: string) {
		return this.http.get(`/assets/posts/${slug}.md`, { responseType: 'text' }).pipe(map((markdown) => marked.parse(markdown)));
	}
}
