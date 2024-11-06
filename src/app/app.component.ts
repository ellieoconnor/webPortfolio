import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationLinksComponent } from './components/navigation/navigation-links.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, NavigationLinksComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'webPortfolio';
}
