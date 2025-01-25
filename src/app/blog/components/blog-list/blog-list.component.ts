import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardContent } from '@angular/material/card';
import { BlogService } from '../../blog.service';

@Component({
	selector: 'app-blog-list',
	standalone: true,
	imports: [MatDivider, MatCard, MatCardContent],
	templateUrl: './blog-list.component.html',
	styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
	constructor(private blogService: BlogService) {}
}
