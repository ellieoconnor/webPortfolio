import { TestBed } from '@angular/core/testing';
import { BlogListComponent } from './blog-list.component';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BlogPost } from '../blog-post.model';

jest.mock('../blog.service');
jest.mock('@angular/router');

describe('BlogListComponent', () => {
	let component: BlogListComponent;
	let blogService: jest.Mocked<BlogService>;
	let router: jest.Mocked<Router>;

	const mockPosts: BlogPost[] = [
		{
			id: 123,
			title: 'Post 1',
			slug: 'post-1',
			description: 'Description 1',
			publishedAt: new Date(),
			url: 'https://dev.to/test/post-1',
			readingTimeMinutes: 5,
			tagList: ['angular']
		},
		{
			id: 456,
			title: 'Post 2',
			slug: 'post-2',
			description: 'Description 2',
			publishedAt: new Date(),
			url: 'https://dev.to/test/post-2',
			readingTimeMinutes: 3,
			tagList: []
		}
	];

	beforeEach(() => {
		blogService = {
			getPostsList: jest.fn()
		} as unknown as jest.Mocked<BlogService>;

		router = {
			navigate: jest.fn()
		} as unknown as jest.Mocked<Router>;

		TestBed.configureTestingModule({
			providers: [BlogListComponent, { provide: BlogService, useValue: blogService }, { provide: Router, useValue: router }]
		});

		component = TestBed.inject(BlogListComponent);
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch a list of blog posts on initialization', () => {
		blogService.getPostsList.mockReturnValue(of(mockPosts));

		component.ngOnInit();

		expect(blogService.getPostsList).toHaveBeenCalled();
		expect(component.posts).toEqual(mockPosts);
	});

	it('should handle errors when fetching blog posts', () => {
		const error = new Error('Failed to fetch posts');
		blogService.getPostsList.mockReturnValue(throwError(() => error));
		console.error = jest.fn();

		component.ngOnInit();

		expect(blogService.getPostsList).toHaveBeenCalled();
		expect(console.error).toHaveBeenCalledWith('Error fetching posts:', error);
		expect(component.posts).toEqual([]);
	});

	it('should navigate to a blog post when getBlogPost is called', () => {
		const articleId = 123;

		component.getBlogPost(articleId);

		expect(router.navigate).toHaveBeenCalledWith(['/blog', articleId]);
	});
});
