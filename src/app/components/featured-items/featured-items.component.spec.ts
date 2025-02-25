import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FeaturedItemsComponent } from './featured-items.component';
import { BlogService } from '../blog/blog.service';
import { of, throwError } from 'rxjs';
import { BlogPost } from '../blog/blog-post.model';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('FeaturedItemsComponent', () => {
	let component: FeaturedItemsComponent;
	let fixture: ComponentFixture<FeaturedItemsComponent>;
	let blogService: BlogService;

	const mockBlogPosts: BlogPost[] = [
		{
			title: 'Post 1',
			slug: 'post-1',
			datePublished: new Date('2023-01-01'),
			summary: 'Summary 1',
			isFeatured: true
		},
		{
			title: 'Post 2',
			slug: 'post-2',
			datePublished: new Date('2023-02-01'),
			summary: 'Summary 2',
			isFeatured: true
		},
		{
			title: 'Post 3',
			slug: 'post-3',
			datePublished: new Date('2023-03-01'),
			summary: 'Summary 3',
			isFeatured: true
		},
		{
			title: 'Post 4',
			slug: 'post-4',
			datePublished: new Date('2023-04-01'),
			summary: 'Summary 4',
			isFeatured: true
		}
	];

	const nonFeaturedPosts: BlogPost[] = [
		{
			title: 'Post 5',
			slug: 'post-5',
			datePublished: new Date('2023-05-01'),
			summary: 'Summary 5',
			isFeatured: false
		}
	];

	beforeEach(async () => {
		// Mock BlogService
		const blogServiceMock = {
			getPostsList: jest.fn() // Mock getPostsList with jest.fn()
		};

		await TestBed.configureTestingModule({
			imports: [
				FeaturedItemsComponent, // Standalone component
				RouterTestingModule // Angular's RouterTestingModule
			],
			providers: [
				{ provide: BlogService, useValue: blogServiceMock },
				{ provide: ActivatedRoute, useValue: {} } // Mock ActivatedRoute
			]
		}).compileComponents();

		fixture = TestBed.createComponent(FeaturedItemsComponent);
		component = fixture.componentInstance;
		blogService = TestBed.inject(BlogService);
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch blog posts and display only featured posts (max 3)', () => {
		// Mock `getPostsList` to return the mock blog posts
		(blogService.getPostsList as jest.Mock).mockReturnValue(of(mockBlogPosts));

		// Trigger change detection and ngOnInit lifecycle
		fixture.detectChanges();

		fixture.whenStable().then(() => {
			expect(component.blogPosts.length).toBe(3); // Should limit to the first 3 posts
			expect(component.blogPosts).toEqual(mockBlogPosts.slice(0, 3)); // Only top 3 featured posts

			// Verify rendered HTML
			const compiled = fixture.nativeElement;
			const cardTitles = compiled.querySelectorAll('.mat-card-title');
			expect(cardTitles.length).toEqual(3); // Expect 3 cards rendered
			expect(cardTitles[0].textContent).toContain('Post 1'); // Check the correct card appears
			expect(cardTitles[1].textContent).toContain('Post 2');
			expect(cardTitles[2].textContent).toContain('Post 3');
		});
	});

	it('should handle errors when fetching posts', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
		(blogService.getPostsList as jest.Mock).mockReturnValue(throwError(() => new Error('Error fetching posts')));

		fixture.detectChanges(); // Trigger ngOnInit()

		expect(component.blogPosts).toEqual([]);
		expect(consoleSpy).toHaveBeenCalledWith('Error fetching posts:', expect.any(Error));
		consoleSpy.mockRestore();
	});

	it('should correctly filter out non-featured posts', () => {
		(blogService.getPostsList as jest.Mock).mockReturnValue(of(nonFeaturedPosts)); // All posts are non-featured

		fixture.detectChanges();

		expect(component.blogPosts.length).toBe(0); // No featured posts
	});
});
