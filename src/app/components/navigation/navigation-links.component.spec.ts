import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLinksComponent } from './navigation-links.component';

describe('ToolbarComponent', () => {
	let component: NavigationLinksComponent;
	let fixture: ComponentFixture<NavigationLinksComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NavigationLinksComponent]
		});
		fixture = TestBed.createComponent(NavigationLinksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
