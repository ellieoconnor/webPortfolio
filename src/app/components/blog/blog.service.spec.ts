import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DevToApiResponse } from './blog-post.model';

describe('BlogService', () => {
	let service: BlogService;
	let httpTestingController: HttpTestingController;

	const mockApiResponse: DevToApiResponse[] = [
		{
			id: 123,
			title: 'Test Post 1',
			slug: 'test-post-1',
			description: 'Description 1',
			published_at: '2023-01-01T00:00:00Z',
			cover_image: null,
			url: 'https://dev.to/test/test-post-1',
			reading_time_minutes: 5,
			tag_list: ['angular', 'testing']
		},
		{
			id: 456,
			title: 'Test Post 2',
			slug: 'test-post-2',
			description: 'Description 2',
			published_at: '2023-02-01T00:00:00Z',
			cover_image: 'https://example.com/image.jpg',
			url: 'https://dev.to/test/test-post-2',
			reading_time_minutes: 3,
			tag_list: []
		}
	];

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

	it('should fetch the blog posts list from dev.to', () => {
		service.getPostsList().subscribe((posts) => {
			expect(posts.length).toBe(2);
			expect(posts[0].id).toBe(123);
			expect(posts[0].title).toBe('Test Post 1');
			expect(posts[0].tagList).toEqual(['angular', 'testing']);
			expect(posts[1].coverImage).toBe('https://example.com/image.jpg');
		});

		const req = httpTestingController.expectOne('https://dev.to/api/articles?username=ellieoconnor');
		expect(req.request.method).toEqual('GET');
		req.flush(mockApiResponse);
	});

	it('should fetch a single blog post by ID', () => {
		const articleId = 123;
		const mockSingleArticle: DevToApiResponse = {
			...mockApiResponse[0],
			body_html: '<h1>Test Post Content</h1>'
		};

		service.getSinglePost(articleId).subscribe((result) => {
			expect(result).not.toBeNull();
			expect(result!.post.id).toBe(123);
			expect(result!.post.title).toBe('Test Post 1');
			expect(result!.bodyHtml).toBe('<h1>Test Post Content</h1>');
		});

		const req = httpTestingController.expectOne(`https://dev.to/api/articles/${articleId}`);
		expect(req.request.method).toEqual('GET');
		req.flush(mockSingleArticle);
	});

	it('should return null for invalid article ID', () => {
		service.getSinglePost(-1).subscribe((result) => {
			expect(result).toBeNull();
		});

		httpTestingController.expectNone('https://dev.to/api/articles/-1');
	});

	it('should return null when fetching a single blog post fails', () => {
		const articleId = 999;

		service.getSinglePost(articleId).subscribe((result) => {
			expect(result).toBeNull();
		});

		const req = httpTestingController.expectOne(`https://dev.to/api/articles/${articleId}`);
		expect(req.request.method).toEqual('GET');
		req.flush('Not Found', { status: 404, statusText: 'Not Found' });
	});

	it('should return empty array when fetching posts list fails', () => {
		service.getPostsList().subscribe((posts) => {
			expect(posts).toEqual([]);
		});

		const req = httpTestingController.expectOne('https://dev.to/api/articles?username=ellieoconnor');
		req.flush('Error', { status: 500, statusText: 'Server Error' });
	});
});
