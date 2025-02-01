import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-blog-list',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './blog-list.component.html',
	styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
	posts = {};
}
