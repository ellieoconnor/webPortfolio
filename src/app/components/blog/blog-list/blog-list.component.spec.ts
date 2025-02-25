import { TestBed } from '@angular/core/testing';
import { BlogListComponent } from './blog-list.component';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

jest.mock('../blog.service');
jest.mock('@angular/router');

describe('BlogListComponent', () => {
	let component: BlogListComponent;
	let blogService: jest.Mocked<BlogService>;
	let router: jest.Mocked<Router>;

	beforeEach(() => {
		// Create mock instances for BlogService and Router
		blogService = {
			getPostsList: jest.fn()
		} as unknown as jest.Mocked<BlogService>;

		router = {
			navigate: jest.fn()
		} as unknown as jest.Mocked<Router>;

		// Configure TestBed for the component
		TestBed.configureTestingModule({
			providers: [BlogListComponent, { provide: BlogService, useValue: blogService }, { provide: Router, useValue: router }]
		});

		component = TestBed.inject(BlogListComponent);
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch a list of blog posts on initialization', () => {
		// Arrange: mock service response
		const mockPosts = [
			{ title: 'Post 1', slug: 'post-1', content: 'Content 1', datePublished: new Date() },
			{ title: 'Post 2', slug: 'post-2', content: 'Content 2', datePublished: new Date() }
		];
		blogService.getPostsList.mockReturnValue(of(mockPosts));

		// Act: initialize the component
		component.ngOnInit();

		// Assert: ensure service was called and posts were assigned
		expect(blogService.getPostsList).toHaveBeenCalled();
		expect(component.posts).toEqual(mockPosts);
	});

	it('should handle errors when fetching blog posts', () => {
		// Arrange: mock an error response from the service
		const error = new Error('Failed to fetch posts');
		blogService.getPostsList.mockReturnValue(throwError(() => error));
		console.error = jest.fn(); // Mock `console.error`

		// Act: initialize the component
		component.ngOnInit();

		// Assert: check that error was logged and posts remain empty
		expect(blogService.getPostsList).toHaveBeenCalled();
		expect(console.error).toHaveBeenCalledWith('Error fetching posts:', error);
		expect(component.posts).toEqual([]);
	});

	it('should navigate to a blog post when getBlogPost is called', () => {
		// Arrange: blog post slug
		const slug = 'test-post';

		// Act: invoke the method
		component.getBlogPost(slug);

		// Assert: ensure router.navigate was called with the correct arguments
		expect(router.navigate).toHaveBeenCalledWith(['/blog', slug]);
	});
});
