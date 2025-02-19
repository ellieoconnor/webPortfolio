import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
	selector: 'app-blog-post',
	standalone: true,
	imports: [AsyncPipe, NgIf, CommonModule],
	templateUrl: './blog-post.component.html',
	styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {
	postContent$: Observable<string> | null = null;

	constructor(
		private route: ActivatedRoute,
		private blogService: BlogService
	) {}

	ngOnInit(): void {
		const slug = this.route.snapshot.paramMap.get('slug');
		if (slug) {
			this.postContent$ = this.blogService
				.getSinglePost(slug)
				.pipe(tap((html) => console.log('HTML being emitted to postContent$:', html)));
		}
	}
}
