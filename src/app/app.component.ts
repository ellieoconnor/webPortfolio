import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationLinksComponent } from './components/navigation/navigation-links.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AboutHeaderComponent } from './components/about-header/about-header.component';
import { FeaturedItemsComponent } from './components/featured-items/featured-items.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, NavigationLinksComponent, MatToolbarModule, AboutHeaderComponent, FeaturedItemsComponent, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'webPortfolio';
	isLoading: boolean = false;
}
