import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostComponent } from './blog-post.component';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BlogPost } from '../blog-post.model';

describe('BlogPostComponent', () => {
	let component: BlogPostComponent;
	let fixture: ComponentFixture<BlogPostComponent>;
	let blogServiceMock: any;
	let activatedRouteMock: any;

	const mockPost: BlogPost = {
		id: 123,
		title: 'Test Post',
		slug: 'test-post',
		description: 'Test description',
		publishedAt: new Date('2023-01-01'),
		url: 'https://dev.to/test/test-post',
		readingTimeMinutes: 5,
		tagList: ['angular', 'testing']
	};

	beforeEach(async () => {
		blogServiceMock = {
			getSinglePost: jest.fn()
		};

		activatedRouteMock = {
			snapshot: {
				paramMap: {
					get: jest.fn()
				}
			}
		};

		await TestBed.configureTestingModule({
			imports: [BlogPostComponent],
			providers: [
				{ provide: BlogService, useValue: blogServiceMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(BlogPostComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch a single blog post on ngOnInit', () => {
		const mockId = '123';
		const mockBodyHtml = '<h1>Test Post</h1>';

		activatedRouteMock.snapshot.paramMap.get.mockReturnValue(mockId);
		blogServiceMock.getSinglePost.mockReturnValue(of({ post: mockPost, bodyHtml: mockBodyHtml }));

		component.ngOnInit();

		expect(activatedRouteMock.snapshot.paramMap.get).toHaveBeenCalledWith('id');
		expect(blogServiceMock.getSinglePost).toHaveBeenCalledWith(123);
		expect(component.post).toEqual(mockPost);
		expect(component.loading).toBe(false);
		expect(component.error).toBe(false);
	});

	it('should set error when no id is provided', () => {
		activatedRouteMock.snapshot.paramMap.get.mockReturnValue(null);

		component.ngOnInit();

		expect(blogServiceMock.getSinglePost).not.toHaveBeenCalled();
		expect(component.error).toBe(true);
		expect(component.loading).toBe(false);
	});

	it('should set error when invalid id is provided', () => {
		activatedRouteMock.snapshot.paramMap.get.mockReturnValue('invalid');

		component.ngOnInit();

		expect(blogServiceMock.getSinglePost).not.toHaveBeenCalled();
		expect(component.error).toBe(true);
		expect(component.loading).toBe(false);
	});

	it('should set error when service returns null', () => {
		activatedRouteMock.snapshot.paramMap.get.mockReturnValue('123');
		blogServiceMock.getSinglePost.mockReturnValue(of(null));

		component.ngOnInit();

		expect(component.error).toBe(true);
		expect(component.loading).toBe(false);
	});

	it('should handle service error', () => {
		activatedRouteMock.snapshot.paramMap.get.mockReturnValue('123');
		blogServiceMock.getSinglePost.mockReturnValue(throwError(() => new Error('Network error')));

		component.ngOnInit();

		expect(component.error).toBe(true);
		expect(component.loading).toBe(false);
	});
});
