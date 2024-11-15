import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationLinksComponent } from './components/navigation/navigation-links.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AboutHeaderComponent } from './components/about-header/about-header.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, NavigationLinksComponent, MatToolbarModule, AboutHeaderComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'webPortfolio';
}
