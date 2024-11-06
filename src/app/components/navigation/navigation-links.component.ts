import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
	selector: 'app-navigation-links',
	standalone: true,
	imports: [CommonModule, MatToolbarModule, MatSidenavModule, MatListModule],
	templateUrl: './navigation-links.component.html',
	styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent {}
