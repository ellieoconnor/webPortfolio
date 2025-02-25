import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { marked } from 'marked';

describe('BlogService', () => {
	let service: BlogService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [BlogService]
		});
		service = TestBed.inject(BlogService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should fetch the blog posts list', () => {
		const mockPosts = [
			{ title: 'Test Post 1', slug: 'test-post-1' },
			{ title: 'Test Post 2', slug: 'test-post-2' }
		];

		service.getPostsList().subscribe((posts) => {
			expect(posts).toEqual(mockPosts);
		});

		const req = httpTestingController.expectOne('assets/posts/posts.json');
		expect(req.request.method).toEqual('GET');
		req.flush(mockPosts);
	});

	it('should fetch and parse a single blog post', () => {
		const slug = 'test-post-1';
		const mockMarkdown = '# Test Post 1\n This is a test blog post.';
		const mockParsedHtml = marked(mockMarkdown);

		service.getSinglePost(slug).subscribe((content) => {
			expect(content).toEqual(mockParsedHtml);
		});

		const req = httpTestingController.expectOne(`/assets/posts/${slug}.md`);
		expect(req.request.method).toEqual('GET');
		req.flush(mockMarkdown); // Provide mock Markdown as response
	});

	it('should return error HTML when fetching a single blog post fails', () => {
		const slug = 'non-existent-post';
		const mockErrorMessage = '404 Not Found';

		service.getSinglePost(slug).subscribe((content) => {
			expect(content).toEqual('<h1>Error</h1><p>Post could not be loaded.</p>');
		});

		const req = httpTestingController.expectOne(`/assets/posts/${slug}.md`);
		expect(req.request.method).toEqual('GET');
		req.flush(mockErrorMessage, { status: 404, statusText: 'Not Found' }); // Simulate an error response
	});
});
