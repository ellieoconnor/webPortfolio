import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-blog-post',
	standalone: true,
	imports: [],
	templateUrl: './blog-post.component.html',
	styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
	// slug: string;
	// post: any;

	constructor(private route: ActivatedRoute) {}

	// 	this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
	//
	// 	// Fetch the blog post using the slug
	// 	const contentFiles = injectContentFiles();
	// 	this.post = contentFiles.find((file) => file.slug === this.slug);
	// }
}

// export default BlogPostComponent;
