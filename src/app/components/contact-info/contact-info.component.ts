import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-contact-info',
	standalone: true,
	imports: [MatDivider, RouterModule],
	templateUrl: './contact-info.component.html',
	styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
	contactItems = [
		{ label: 'Email', value: '<EMAIL>' },
		{ label: 'GitHub', value: '#' },
		{ label: 'LinkedIn', value: '#' }
	];
}
