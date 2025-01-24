import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FakeBlogPost } from './fake-blog-post.model';

@Component({
	selector: 'app-featured-items',
	standalone: true,
	imports: [CommonModule, MatCardModule, FontAwesomeModule],
	templateUrl: './featured-items.component.html',
	styleUrls: ['./featured-items.component.scss']
})
export class FeaturedItemsComponent {
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
	fakeBlogPosts: FakeBlogPost[] = [
		{
			title: 'Blog Post Number One',
			datePublished: this.currentDate,
			isPublished: true,
			summary: 'This is a short summary about the first blog I posted.'
		},
		{
			title: 'How I Built My Website',
			datePublished: new Date(2024, 11, 10),
			isPublished: true,
			summary: 'I got a job really on a whim and a lot of faith in me. I wanted to put something out there though...'
		},
		{
			title: 'What is Obsidian',
			datePublished: new Date(2024, 12, 23),
			isPublished: true,
			summary: 'Welcome to my second brain. How to setup your obsidian and a tour through my vault'
		}
	];
}
