import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { InputValidationService } from '../../../services/input-validation.service';

@Component({
	selector: 'app-blog-post',
	imports: [AsyncPipe, CommonModule],
	templateUrl: './blog-post.component.html',
	styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {
	postContent$: Observable<string | null> | null = null;

	constructor(
		private route: ActivatedRoute,
		private blogService: BlogService,
		private sanitizer: DomSanitizer,
		private validationService: InputValidationService
	) {}

	ngOnInit(): void {
		const slug = this.route.snapshot.paramMap.get('slug');

		// Validate slug using the validation service
		if (slug && this.validationService.validateSlug(slug)) {
			this.postContent$ = this.blogService.getSinglePost(slug).pipe(
				map((html) => {
					// Sanitize HTML to prevent XSS attacks
					// Using sanitize() instead of bypassSecurityTrust to ensure proper sanitization
					const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, html);
					return this.sanitizer.sanitize(SecurityContext.HTML, sanitized || '');
				})
			);
		}
	}
}
