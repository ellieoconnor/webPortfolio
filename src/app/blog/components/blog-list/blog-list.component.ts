import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { BlogService } from '../../blog.service';
import { BlogPostMetadata } from '../../blog.model';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
	selector: 'app-blog-list',
	standalone: true,
	imports: [MatDivider, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, DatePipe, NgForOf],
	templateUrl: './blog-list.component.html',
	styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
	/* Updated posts to hold BlogPostMetadata objects */
	posts: BlogPostMetadata[] = [];

	constructor(private blogService: BlogService) {}

	ngOnInit() {
		this.blogService.fetchAllPostsMetadata().subscribe((metadata: BlogPostMetadata[]) => {
			console.log('Fetched metadata:', metadata); // Log the fetched metadata
			this.posts = metadata; // Assign fetched metadata
		});
	}
}
