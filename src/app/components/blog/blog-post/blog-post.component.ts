import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogPost } from '../blog-post.model';

@Component({
	selector: 'app-blog-post',
	imports: [CommonModule, DatePipe],
	templateUrl: './blog-post.component.html',
	styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {
	post: BlogPost | null = null;
	postContent: string | null = null;
	loading = true;
	error = false;

	constructor(
		private route: ActivatedRoute,
		private blogService: BlogService,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		const idParam = this.route.snapshot.paramMap.get('id');
		const articleId = idParam ? parseInt(idParam, 10) : null;

		if (articleId && !isNaN(articleId) && articleId > 0) {
			this.blogService.getSinglePost(articleId).subscribe({
				next: (result) => {
					if (result) {
						this.post = result.post;
						// Sanitize HTML to prevent XSS attacks
						this.postContent = this.sanitizer.sanitize(SecurityContext.HTML, result.bodyHtml);
					} else {
						this.error = true;
					}
					this.loading = false;
				},
				error: () => {
					this.error = true;
					this.loading = false;
				}
			});
		} else {
			this.error = true;
			this.loading = false;
		}
	}
}
