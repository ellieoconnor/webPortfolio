import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FeaturedItemsComponent } from './featured-items.component';
import { BlogService } from '../blog/blog.service';
import { of, throwError } from 'rxjs';
import { BlogPost } from '../blog/blog-post.model';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('FeaturedItemsComponent', () => {
	let component: FeaturedItemsComponent;
	let fixture: ComponentFixture<FeaturedItemsComponent>;
	let blogService: BlogService;

	const mockBlogPosts: BlogPost[] = [
		{
			id: 1,
			title: 'Post 1',
			slug: 'post-1',
			publishedAt: new Date('2023-01-01'),
			description: 'Description 1',
			url: 'https://dev.to/test/post-1',
			readingTimeMinutes: 5,
			tagList: []
		},
		{
			id: 2,
			title: 'Post 2',
			slug: 'post-2',
			publishedAt: new Date('2023-02-01'),
			description: 'Description 2',
			url: 'https://dev.to/test/post-2',
			readingTimeMinutes: 3,
			tagList: []
		},
		{
			id: 3,
			title: 'Post 3',
			slug: 'post-3',
			publishedAt: new Date('2023-03-01'),
			description: 'Description 3',
			url: 'https://dev.to/test/post-3',
			readingTimeMinutes: 4,
			tagList: []
		},
		{
			id: 4,
			title: 'Post 4',
			slug: 'post-4',
			publishedAt: new Date('2023-04-01'),
			description: 'Description 4',
			url: 'https://dev.to/test/post-4',
			readingTimeMinutes: 6,
			tagList: []
		}
	];

	beforeEach(async () => {
		const blogServiceMock = {
			getPostsList: jest.fn()
		};

		await TestBed.configureTestingModule({
			imports: [FeaturedItemsComponent, RouterTestingModule],
			providers: [
				{ provide: BlogService, useValue: blogServiceMock },
				{ provide: ActivatedRoute, useValue: {} }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(FeaturedItemsComponent);
		component = fixture.componentInstance;
		blogService = TestBed.inject(BlogService);
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch blog posts and display top 3', () => {
		(blogService.getPostsList as jest.Mock).mockReturnValue(of(mockBlogPosts));

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			expect(component.blogPosts.length).toBe(3);
			expect(component.blogPosts).toEqual(mockBlogPosts.slice(0, 3));

			const compiled = fixture.nativeElement;
			const cardTitles = compiled.querySelectorAll('.mat-card-title');
			expect(cardTitles.length).toEqual(3);
			expect(cardTitles[0].textContent).toContain('Post 1');
			expect(cardTitles[1].textContent).toContain('Post 2');
			expect(cardTitles[2].textContent).toContain('Post 3');
		});
	});

	it('should handle errors when fetching posts', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
		(blogService.getPostsList as jest.Mock).mockReturnValue(throwError(() => new Error('Error fetching posts')));

		fixture.detectChanges();

		expect(component.blogPosts).toEqual([]);
		expect(consoleSpy).toHaveBeenCalledWith('Error fetching posts:', expect.any(Error));
		consoleSpy.mockRestore();
	});

	it('should handle empty posts list', () => {
		(blogService.getPostsList as jest.Mock).mockReturnValue(of([]));

		fixture.detectChanges();

		expect(component.blogPosts.length).toBe(0);
	});
});
