import { Component } from '@angular/core';
import { AboutHeaderComponent } from '../../about-header/about-header.component';
import { FeaturedItemsComponent } from '../../featured-items/featured-items.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [AboutHeaderComponent, FeaturedItemsComponent],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss'
})
export class HomePageComponent {}
