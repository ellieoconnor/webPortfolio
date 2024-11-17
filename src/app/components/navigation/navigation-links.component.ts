import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-navigation-links',
	standalone: true,
	imports: [CommonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonToggleModule, FaIconComponent, MatButtonModule],
	templateUrl: './navigation-links.component.html',
	styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent {
	isDarkMode: boolean = false;

	/* List of Icons */
	icons = {
		darkModeMoon: faMoon,
		lightModeSun: faSun
	};

	toggleDarkMode() {
		this.isDarkMode = !this.isDarkMode;
		// EO Note: make the theme dark mode or light. Should maybe use in a theme service
		// if (this.isDarkMode) {
		// }
	}
}
