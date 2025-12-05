import { Component, HostListener, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { ThemeLogicService } from '../theme-logic.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

interface Link {
	label: string;
	href: string;
	target?: string;
}

@Component({
	selector: 'app-navigation-links',
	imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    FaIconComponent,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatMenuTrigger,
    MatMenu,
    MatSlideToggle,
    MatMenuItem
],
	templateUrl: './navigation-links.component.html',
	styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent implements OnInit {
	isDarkMode: boolean = false;
	isMobileMenuOpen = false;
	isMobileView = false;

	/* List of Icons */
	icons = {
		darkModeMoon: faMoon,
		lightModeSun: faSun,
		menu: faBars
	};

	links: Link[] = [
		{ label: 'Home', href: '/home', target: '_self' },
		{ label: 'Writing', href: '/blog-posts', target: '_self' },
		{ label: 'Contact', href: '/contact', target: '_self' },
		{ label: 'My Work', href: '/my-work', target: '_self' }
	];

	constructor(private themeService: ThemeLogicService) {
		this.checkScreenSize();
	}

	ngOnInit(): void {
		this.isDarkMode = this.themeService.darkModeEnabled;
	}

	@HostListener('window:resize')
	checkScreenSize() {
		this.isMobileView = window.innerWidth < 768;

		// Close mobile menu if screen is resized to desktop view
		if (!this.isMobileView && this.isMobileMenuOpen) {
			this.isMobileMenuOpen = false;
		}
	}

	toggleDarkMode() {
		this.themeService.toggleTheme();

		this.isDarkMode = this.themeService.darkModeEnabled;
	}
}
