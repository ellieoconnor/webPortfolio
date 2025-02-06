import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { marked } from 'marked';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	constructor(private http: HttpClient) {}

	getPosts() {
		return this.http.get('assets/posts/posts.json');
	}

	getSinglePost(slug: string) {
		return this.http.get(`/assets/blog/${slug}.md`, { responseType: 'text' }).pipe(map((markdown) => marked.parse(markdown)));
	}
}
