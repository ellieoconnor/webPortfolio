import { Component } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-footer',
	imports: [MatNavList, DatePipe],
	template: `
		<mat-nav-list class="navigation-item-container">
			<div class="foot-container">
				<p>Copyright &#64;{{ currentDate | date: 'y' }}. All Rights Reserved</p>
			</div>
		</mat-nav-list>
	`,
	styleUrl: './footer.component.scss'
})
export class FooterComponent {
	currentDate = new Date();
}
