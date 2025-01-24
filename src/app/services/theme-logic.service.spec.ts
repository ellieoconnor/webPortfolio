import { TestBed } from '@angular/core/testing';
import { ThemeLogicService } from './theme-logic.service';

describe('ThemeLogicService', () => {
	let service: ThemeLogicService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ThemeLogicService);

		// Clear local storage for isolation of tests
		localStorage.removeItem('darkMode');
		document.documentElement.classList.remove('dark');
	});

	describe('toggleTheme', () => {
		it('should enable dark mode when toggled from light mode', () => {
			service.darkModeEnabled = false;

			service.toggleTheme();

			expect(service.darkModeEnabled).toBe(true);
			expect(localStorage.getItem('darkMode')).toBe('true');
			expect(document.documentElement.classList.contains('dark')).toBe(true);
		});

		it('should disable dark mode when toggled from dark mode', () => {
			service.darkModeEnabled = true;

			service.toggleTheme();

			expect(service.darkModeEnabled).toBe(false);
			expect(localStorage.getItem('darkMode')).toBe('false');
			expect(document.documentElement.classList.contains('dark')).toBe(false);
		});
	});
});
