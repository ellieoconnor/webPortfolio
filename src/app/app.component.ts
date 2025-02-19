import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationLinksComponent } from './components/navigation/navigation-links.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, NavigationLinksComponent, MatToolbarModule, FooterComponent, RouterOutlet, HttpClientModule],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'webPortfolio';
	isLoading: boolean = false;
}
