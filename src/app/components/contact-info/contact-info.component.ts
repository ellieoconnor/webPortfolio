import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface ContactItem {
	label: string;
	icon: IconDefinition;
	href?: string;
}

@Component({
    selector: 'app-contact-info',
    imports: [MatDivider, RouterModule, FaIconComponent],
    templateUrl: './contact-info.component.html',
    styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
	// Email address split for better protection
	emailUser = 'ellieoconnor3114';
	emailDomain = 'gmail.com';

	// Font Awesome Icons
	faEnvelope = faEnvelope;
	faGitHub = faGithub;
	faLinkedIn = faLinkedin;

	contactItems: ContactItem[] = [
		{ label: 'Email', icon: this.faEnvelope, href: `mailto:${this.emailUser}@${this.emailDomain}?Subject=Hello!` },
		{ label: 'GitHub', icon: this.faGitHub, href: 'https://github.com/ellieoconnor' },
		{ label: 'LinkedIn', icon: this.faLinkedIn, href: 'https://www.linkedin.com/in/elizabethoconnor13/' }
	];
}
