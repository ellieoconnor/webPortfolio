import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('HomePageComponent', () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HomePageComponent, HttpClientModule],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
