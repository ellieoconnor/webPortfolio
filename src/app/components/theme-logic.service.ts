import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ThemeLogicService {
	darkModeEnabled: boolean = false;

	constructor() {
		// Check local storage or a default setting
		this.darkModeEnabled = localStorage.getItem('darkMode') === 'true';
		this.updateTheme();
	}

	toggleTheme() {
		this.darkModeEnabled = !this.darkModeEnabled;
		localStorage.setItem('darkMode', this.darkModeEnabled.toString());
		this.updateTheme();
	}

	updateTheme() {
		const htmlElement = document.documentElement;

		if (this.darkModeEnabled) {
			htmlElement.classList.add('dark');
		} else {
			htmlElement.classList.remove('dark');
		}
	}
}
