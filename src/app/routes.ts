import { Routes } from '@angular/router';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to home
	{ path: 'home', loadComponent: () => import('./components/home-page/home-page/home-page.component').then((m) => m.HomePageComponent) },
	{
		path: 'contact',
		loadComponent: () => import('./components/contact-info/contact-info.component').then((m) => m.ContactInfoComponent)
	}
];
