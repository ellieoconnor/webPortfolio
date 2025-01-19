import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

interface ContactItem {
	label: string;
	value: string;
	href?: string;
}

@Component({
	selector: 'app-contact-info',
	standalone: true,
	imports: [MatDivider, RouterModule, NgForOf, NgIf],
	templateUrl: './contact-info.component.html',
	styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
	emailUser = 'ellieoconnor3114';
	emailDomain = 'gmail.com';

	contactItems: ContactItem[] = [
		{ label: 'Email', value: 'Email Me' },
		{ label: 'GitHub', value: '#' },
		{ label: 'LinkedIn', value: '#' }
	];
}
