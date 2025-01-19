import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { ThemeLogicService } from '../theme-logic.service';

interface Link {
	label: string;
	href: string;
	target?: string;
}

@Component({
	selector: 'app-navigation-links',
	standalone: true,
	imports: [CommonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonToggleModule, FaIconComponent, MatButtonModule],
	templateUrl: './navigation-links.component.html',
	styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent implements OnInit {
	isDarkMode: boolean = false;

	/* List of Icons */
	icons = {
		darkModeMoon: faMoon,
		lightModeSun: faSun
	};

	links: Link[] = [
		{ label: 'Home', href: '#' },
		{ label: 'About', href: '#' },
		{ label: 'Blog', href: '#' },
		{ label: 'GitHub', href: 'https://github.com/ellieoconnor', target: '_blank' },
		{ label: 'Contact Me', href: '#' }
	];

	constructor(private themeService: ThemeLogicService) {}

	ngOnInit(): void {
		this.isDarkMode = this.themeService.darkModeEnabled;
	}

	toggleDarkMode() {
		this.themeService.toggleTheme();

		this.isDarkMode = this.themeService.darkModeEnabled;
	}
}
