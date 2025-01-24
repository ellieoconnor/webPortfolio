import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to home
	{
		path: 'home',
		loadComponent: () => import('./components/home-page/home-page/home-page.component').then((m) => m.HomePageComponent)
	},
	{
		path: 'contact',
		loadComponent: () => import('./components/contact-info/contact-info.component').then((m) => m.ContactInfoComponent)
	},
	{
		path: 'blog',
		loadComponent: () => import('./blog/components/blog-list/blog-list.component').then((m) => m.BlogListComponent)
	},
	{
		path: 'blog/:slug',
		loadComponent: () => import('./blog/components/blog-post/blog-post.component').then((m) => m.BlogPostComponent)
	}
];
