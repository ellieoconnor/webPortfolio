import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostComponent } from './blog-post.component';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BlogPostComponent', () => {
	let component: BlogPostComponent;
	let fixture: ComponentFixture<BlogPostComponent>;
	let blogServiceMoc: any;
	let activatedRouteMock: any;

	beforeEach(async () => {
		blogServiceMoc = {
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
				{ provide: BlogService, useValue: blogServiceMoc },
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
		const mockSlug = 'test-slug';
		const mockPostHtml = '<h1>Test Post</h1>';

		activatedRouteMock.snapshot.paramMap.get.mockReturnValue(mockSlug);
		blogServiceMoc.getSinglePost.mockReturnValue(of(mockPostHtml));

		// act
		component.ngOnInit();

		// assert
		expect(activatedRouteMock.snapshot.paramMap.get).toHaveBeenCalledWith('slug');
		expect(blogServiceMoc.getSinglePost).toHaveBeenCalledWith(mockSlug);

		component.postContent$?.subscribe((content) => {
			expect(content).toBe(mockPostHtml);
		});
	});

	it('should not call BlogService if no slug is provided', () => {
		// arrange
		activatedRouteMock.snapshot.paramMap.get.mockReturnValue(null);

		//act
		component.ngOnInit();

		//assert
		expect(blogServiceMoc.getSinglePost).not.toHaveBeenCalled();
		expect(component.postContent$).toBeNull();
	});
});
