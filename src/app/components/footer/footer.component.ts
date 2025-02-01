import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatNavList } from '@angular/material/list';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [FaIconComponent, MatNavList, NgForOf, DatePipe],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss'
})
export class FooterComponent {
	currentDate = new Date();
}
