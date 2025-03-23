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
	bio: string = `Hi, I'm Ellie, and I am a full-stack software developer. At B&L Information Systems, I create digital solutions with Angular and JavaScript/TypeScript that transform complex challenges into seamless experiences. I enjoy bringing ideas to life through code and am always eager to help others solve their digital challenges. Interested in exploring how technology can solve your unique challenges?
`;
	// todo: Add a link to my resume page on the B&L word.
}
