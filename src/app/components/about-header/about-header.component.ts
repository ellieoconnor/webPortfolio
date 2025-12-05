import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-about-header',
    imports: [NgOptimizedImage],
    templateUrl: './about-header.component.html',
    styleUrls: ['./about-header.component.scss']
})
export class AboutHeaderComponent {
	// bio: string = `Hi, I'm Ellie, and I am a full-stack software developer. At B&L Information Systems, I create digital solutions with Angular and JavaScript/TypeScript that transform complex challenges into seamless experiences. I enjoy bringing ideas to life through code and am always eager to help others solve their digital challenges. Interested in exploring how technology can solve your unique challenges?
	bio: string = `I love the process.

	Whether I'm debugging a tricky issue, designing a new feature, or building something from scratch, I find joy in the thinking, tinkering, and refining. I love coming up wiht ideas, testing theories, and slowlying shaping them into the exact right solution. The best moments? When the result is so smooth, the user never even notices the complexity underneath. That's when I know I've done it right.

	I'm Elizabeth (but you can call me Ellie), a software engineer currently working on ERP solutions tailored for the metal casting industry. I care deeply about solving real problems that make people's lives easier, and I am honoured that I get to do so with code.

	Outside of work, you'll usually find me playing guitar, lifting weights, being way too competitive in a board game with loved ones, or getting lost in my latest of many hobbies (currently customizing mechanical keyboards). And yeah, as cringy as it might sound--I really love coding.

	Get in touch and let's enjoy the process of building something together.`;
	// todo: Add a link to my resume page on the B&L word.
}
