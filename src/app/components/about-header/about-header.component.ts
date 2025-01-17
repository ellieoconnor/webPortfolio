import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
	selector: 'app-about-header',
	standalone: true,
	imports: [CommonModule, NgOptimizedImage],
	templateUrl: './about-header.component.html',
	styleUrls: ['./about-header.component.scss']
})
export class AboutHeaderComponent {
	bio: string = `Hi, I’m Ellie. I’m a front-end developer, avid reader, and eternal optimist. I work at B&L Information Systems, where I use Angular and JavaScript/TypeScript to build ERP solutions that streamline workflows for the metal-casting and foundry industries.`;
	// todo: Add a link to my resume page on the B&L word.
}
