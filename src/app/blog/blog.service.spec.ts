import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogPost } from './blog.model';

describe('BlogService', () => {
	let service: BlogService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [BlogService]
		});
		// Inject the service and HTTP mock
		service = TestBed.inject(BlogService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		// ensure there are no outstanding requests.
		httpMock.verify();
	});

	it('should fetch a single blog post by slug', () => {
		// ARRANGE mock data
		const mockSlug = 'my-blog-post';
		const mockResponse: BlogPost = {
			metadata: {
				title: 'My Blog Post',
				datePublished: '2023-10-01',
				description: 'This is a test post',
				status: 'published',
				slug: 'my-blog-post'
			},
			content: '# My Blog Post\nThis is the content of a blog post.'
		};

		// ACT: Call the service
		service.fetchBlogPost(mockSlug).subscribe((response) => {
			// ASSERT: Test the result
			expect(response).toBeTruthy();
			expect(response.metadata.title).toBe('My Blog Post');
			expect(response.metadata.slug).toBe(mockSlug);
			expect(response.content).toContain('# My Blog Post');
		});

		// Verify that the correct HTTP call was mode
		const req = httpMock.expectOne(`assets/posts/${mockSlug}.md`);
		expect(req.request.method).toBe('GET');

		// Respond with mock data
		req.flush(mockResponse);
	});
});
