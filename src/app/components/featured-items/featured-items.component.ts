import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { BlogPost } from '../blog/blog-post.model';
import { BlogService } from '../blog/blog.service';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'app-featured-items',
	standalone: true,
	imports: [CommonModule, MatCardModule, FontAwesomeModule, RouterLink, MatButton],
	templateUrl: './featured-items.component.html',
	styleUrls: ['./featured-items.component.scss']
})
export class FeaturedItemsComponent implements OnInit {
	currentDate = new Date();
	/* List of Icons */
	icons = {
		date: faCalendar
	};

	/* List of Phrases */
	phrases = {
		title: 'Featured Posts',
		more: 'Read all posts'
	};

	/* Blog Posts */
	blogPosts: BlogPost[] = [];

	constructor(private blogService: BlogService) {}

	ngOnInit() {
		this.blogService.getPostsList().subscribe(
			(posts: BlogPost[]) => {
				// Filter only featured posts and limit it by the top 3
				this.blogPosts = posts.filter((post) => post.isFeatured).slice(0, 3);
			},
			(error) => {
				console.error('Error fetching posts:', error);
			}
		);
	}
}
