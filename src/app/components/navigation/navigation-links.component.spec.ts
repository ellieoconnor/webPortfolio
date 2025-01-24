import { ThemeLogicService } from '../theme-logic.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationLinksComponent } from './navigation-links.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationLinksComponent', () => {
	let component: NavigationLinksComponent;
	let fixture: ComponentFixture<NavigationLinksComponent>;
	let mockThemeService: jest.Mocked<ThemeLogicService>;

	beforeEach(() => {
		mockThemeService = {
			darkModeEnabled: false,
			toggleTheme: jest.fn(() => {
				mockThemeService.darkModeEnabled = !mockThemeService.darkModeEnabled;
			}),
			updateTheme: jest.fn() // Add this mock even in this approach
		};

		TestBed.configureTestingModule({
			imports: [NavigationLinksComponent, RouterTestingModule],
			providers: [{ provide: ThemeLogicService, useValue: mockThemeService }]
		});
		fixture = TestBed.createComponent(NavigationLinksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call themeService.toggleTheme and update isDarkMode when toggleDarkMode is called', () => {
		// Initial state
		expect(component.isDarkMode).toBe(false);

		// Call method
		component.toggleDarkMode();

		// Expect service's method to have been called
		expect(mockThemeService.toggleTheme).toHaveBeenCalled();

		// Verify
		expect(component.isDarkMode).toBe(true);
	});
});
